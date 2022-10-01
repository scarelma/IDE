package routes

import (
	"github.com/gofiber/fiber/v2"
)

type request struct {
	LanguageNumber int    `json:"langnumber"`
	Code           string `json:"code"`
	Input          string `json:"input"`
}

func CodeSender(c *fiber.Ctx) error {
	// This function takes code and server number from user i.e. which language it has to compile to and then send it that way

	return nil
}
