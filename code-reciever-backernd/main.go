package main

import (
	"log"

	// "github.com/Lavender-Laneige/IDE/code-reciever-backernd/pkg/language"
	"github.com/Lavender-Laneige/IDE/code-reciever-backernd/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func setupRoutes(app *fiber.App) {
	// app.Get("/api/v1/serverhealth", routes.ServerHealth)
	app.Post("/api/v1/recievecode", routes.CodeHandler)
}

func main() {
	app := fiber.New()
	// language.AddInitLanguages()
	// setup middleware here
	app.Use(logger.New())
	setupRoutes(app)
	log.Fatal(app.Listen(":3001"))
}
