package routes

import (
	"fmt"

	"github.com/Lavender-Laneige/IDE/code-reciever-backernd/pkg/executer"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/internal/uuid"
)

type request struct {
	Code  string `json:"code"`
	Input string `json:"input"`
}

type response struct {
	Output string `json:"output"`
}

func CodeHandler(c *fiber.Ctx) error {
	var output string

	body := new(request)
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}
	fmt.Println(body)
	fileName := uuid.UUID
	executer.CreateFile(fileName)

	// execute that file through python file name >> and store its output to a file again

	// read that file and return it as output

	// if all this is done then make a default timeout for the execution to be say 30s so that no one can abuse the system

	output = body.Code

	resp := response{
		Output: output,
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
