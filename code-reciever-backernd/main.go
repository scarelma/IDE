package main

import (
	"log"
	"os"

	"github.com/scarelma/IDE/code-reciever-backernd/pkg/routes"
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
	routes.OutputExtension = os.Getenv("OUTPUT_EXTENSION")
	routes.Script = os.Getenv("SCRIPT")
}

func main() {

	app := fiber.New()
	loadEnvVariables()
	// setup middleware here
	app.Use(cors.New())
	app.Use(logger.New())
	setupRoutes(app)
	log.Panic(app.Listen(":3001"))

}
