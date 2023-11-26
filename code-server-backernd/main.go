package main

import (
	"log"

	"github.com/scarelma/IDE/code-server-backernd/pkg/language"
	"github.com/scarelma/IDE/code-server-backernd/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// SetupRoutes sets up all the routes
func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/serverhealth", routes.ServerHealth)
	// app.
	app.Get("/api/v1/language", routes.GetLanguage)
	app.Post("/api/v1/sendcode", routes.CodeSender)
}

func main() {
	app := fiber.New()
	language.AddInitLanguages()

	// setup middleware here
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		// AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Use(logger.New())
	app.Static(
		"/",        // mount address
		"./static", // path to the file folder
	)
	setupRoutes(app)
	app.Static("*", "./static/index.html")
	// panic(errors.New("dfjsfhjs"))
	// route := cors.Default().Handler(app)
	log.Print(app.Listen(":5000"))
}
