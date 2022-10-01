package main

import (
	"github.com/Lavender-Laneige/IDE/code-server-backernd/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/serverhealth", routes.ServerHealth)
	app.Post("/api/v1/sendcode", routes.CodeSender)
}

func main() {
	app := fiber.New()

	// setup middleware here
	app.Use(logger.New())
	setupRoutes(app)
	app.Listen(":3000")
}
