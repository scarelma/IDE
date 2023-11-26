package routes

import (
	"fmt"
	"log"

	"github.com/scarelma/IDE/code-reciever-backernd/pkg/executer"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

var CodeExtension string
var OutputExtension string
var Script string

type request struct {
	Code  string `json:"code"`
	Input string `json:"input"`
}

type response struct {
	Output string `json:"output"`
}

func CodeHandler(c *fiber.Ctx) error {
	// CodeExtension = "cpp"
	// OutputExtension = ""
	var output string
	body := new(request)
	temp := c.Body()
	fmt.Println(string(temp))
	if err := c.BodyParser(body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	// this will be used for folder name
	fileName := uuid.New().String()

	// this will be taken from env variable
	extension := CodeExtension

	// execute that file through python file name >> and store its output to a file again
	f, err := executer.CreateFile(fileName, extension)
	if err != nil {
		log.Panic(err)
	}
	// read that file and return it as output
	executer.WriteFile(f, body.Code)

	// execute that file
	out, err := executer.ExecuteFile(fileName, Script, CodeExtension, OutputExtension, body.Input)
	if err != nil {
		output = err.Error()
	} else {
		output = out
		println(output)
	}

	// if all this is done then make a default timeout for the execution to be say 30s so that no one can abuse the system
	executer.DeleteFile(fileName, extension)

	// output = body.Code
	resp := response{
		Output: output,
	}
	return c.Status(fiber.StatusOK).JSON(resp)
}
