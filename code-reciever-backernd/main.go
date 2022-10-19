package main

import (
	"log"
	"os"

	"github.com/Lavender-Laneige/IDE/code-reciever-backernd/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/serverhealth", routes.ServerHealth)
	app.Post("/api/v1/recievecode", routes.CodeHandler)
}

func loadEnvVariables() {
	routes.CodeExtension = os.Getenv("CODE_EXTENSION")

}

func main() {

	app := fiber.New()
	// setup middleware here
	app.Use(cors.New())
	app.Use(logger.New())
	setupRoutes(app)
	log.Panic(app.Listen("localhost:3001"))

}
