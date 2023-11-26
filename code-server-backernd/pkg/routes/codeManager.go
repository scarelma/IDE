package routes

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/scarelma/IDE/code-server-backernd/pkg/language"
	"github.com/gofiber/fiber/v2"
)

type request struct {
	LanguageNumber int    `json:"langnumber"`
	Code           string `json:"code"`
	Input          string `json:"input"`
}

type response struct {
	Output string `json:"output"`
}

// This function takes code and server number from user i.e. which language it has to compile to and then send it that way
func CodeSender(c *fiber.Ctx) error {

	body := new(request)
	if err := c.BodyParser(&body); err != nil {
		// print c.body as string
		fmt.Println("a", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	url := language.ParseLanguageNumber(body.LanguageNumber)

	fmt.Println(body)

	if url == "" {
		fmt.Println("b", "Empty user response")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Selected Language number doesn't match with server",
		})
	}

	// marshall the data
	postBody, _ := json.Marshal(map[string]string{
		"code":  body.Code,
		"input": body.Input,
	})
	responseBody := bytes.NewBuffer(postBody)

	// send request to that url
	resp, err := http.Post(url, "application/json", responseBody)
	if err != nil {
		log.Panic("c", err)
		fmt.Println("c", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	var tempResponse response
	if err := json.NewDecoder(resp.Body).Decode(&tempResponse); err != nil {
		log.Panic("idk what happened")
		fmt.Println("d", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	fmt.Println("e", tempResponse)

	return c.Status(fiber.StatusOK).JSON(tempResponse)
}
