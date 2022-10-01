package routes

import (
	"github.com/Lavender-Laneige/IDE/code-server-backernd/pkg/language"
	"github.com/gofiber/fiber/v2"
)

type request struct {
	LanguageNumber int    `json:"langnumber"`
	Code           string `json:"code"`
	Input          string `json:"input"`
}

func CodeSender(c *fiber.Ctx) error {
	// This function takes code and server number from user i.e. which language it has to compile to and then send it that way
	body := new(request)
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	url := language.ParseLangugeNumber(body.LanguageNumber)
	// sen request to that url
	return nil
}
