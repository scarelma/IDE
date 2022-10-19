package routes

import "github.com/gofiber/fiber/v2"

func ServerHealth(c *fiber.Ctx) error {
	c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Status": "OK",
	})
	return nil
}
