package main

import (
	"github.com/Lavender-Laneige/IDE/code-server-backernd/server"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/serverhealth", server.ServerHealth)
	app.Post("/api/v1/sendcode", server.CodeSender)
}

func main() {
	app := fiber.New()
	setupRoutes(app)
	app.Listen(":3000")
}
