package routes

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/Lavender-Laneige/IDE/code-server-backernd/pkg/language"
	"github.com/gofiber/fiber/v2"
)

type request struct {
	LanguageNumber int    `json:"langnumber"`
	Code           string `json:"code"`
	Input          string `json:"input"`
}

type response struct {
	Output string `json:output`
}

// type codeRequest struct {
// 	Code  string `json:"code"`
// 	Input string `json:"input"`
// }

// type codeResponse struct {
// 	// Code   string `json:"code"`
// 	Output string `json:"output"`
// }

func CodeSender(c *fiber.Ctx) error {
	// This function takes code and server number from user i.e. which language it has to compile to and then send it that way

	body := new(request)
	fmt.Println("log point c")

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	fmt.Println(body)

	// CodeResponseBody := new(codeResponse)
	fmt.Println("log point d")

	url := language.ParseLanguageNumber(body.LanguageNumber)
	fmt.Println(url)
	if url == "" {
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
	fmt.Println(responseBody)
	// send request to that url
	resp, err := http.Post(url, "application/json", responseBody)
	if err != nil {
		log.Fatalln(err)
	}
	var tempResponse response
	if err := json.NewDecoder(resp.Body).Decode(&tempResponse); err != nil {
		log.Fatal("idk what happened")
	}

	fmt.Println(tempResponse)
	fmt.Println("log point e")
	// resp = response{
	// 	Output: tempResponse.Output,
	// }
	return c.Status(fiber.StatusOK).JSON(tempResponse)
}
