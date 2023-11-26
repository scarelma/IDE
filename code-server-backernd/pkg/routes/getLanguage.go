package routes

import (
	"github.com/scarelma/IDE/code-server-backernd/pkg/language"
	"github.com/gofiber/fiber/v2"
)

func GetLanguage(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(language.Languages)
}
