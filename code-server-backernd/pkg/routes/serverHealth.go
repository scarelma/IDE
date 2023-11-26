package routes

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/scarelma/IDE/code-server-backernd/pkg/language"
	"github.com/gofiber/fiber/v2"
)

// This function checks health of each individual server on which code will run.
func ServerHealth(c *fiber.Ctx) error {

	// ping each url from the languages list and if it returns success then it is good to go
	var url string
	var down int
	var up int
	for i, j := range language.Languages {
		url = j.URL
		url = strings.Replace(url, "recievecode", "serverhealth", -1)
		resp, err := http.Get(url)
		if err != nil {
			down += 1
		} else {
			up += 1
		}
		fmt.Println(i, resp, err)
	}

	c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Health": fmt.Sprintf(`out of %v, %v are up and %v are down`, up+down, up, down),
	})
	return nil

}
