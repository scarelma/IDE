package language

import "fmt"

// Language struct
type language struct {
	Name            string
	Id              int
	URL             string
	Script          string
	CodeExtension   string
	OutputExtension string
}

var Languages []language

// Add init languages to the list of languages to populate the list
func AddInitLanguages() {
	Languages = append(Languages, language{
		Name:            "python",
		Id:              1,
		URL:             "http://localhost:3004/api/v1/recievecode",
		Script:          "python3 <FILENAME>.<CODE_EXTENSION>",
		CodeExtension:   "py",
		OutputExtension: "",
	})
	Languages = append(Languages, language{
		Name:            "c++",
		Id:              2,
		URL:             "http://localhost:3003/api/v1/recievecode",
		Script:          "g++ <FILENAME>.<CODE_EXTENSION> -o <FILENAME>.<OUTPUT_EXTENSION> && ./<FILENAME>.<OUTPUT_EXTENSION>",
		CodeExtension:   "cpp",
		OutputExtension: "out",
	})
	Languages = append(Languages, language{
		Name:            "java",
		Id:              3,
		URL:             "http://localhost:3001/api/v1/recievecode",
		Script:          "javac <FILENAME>.<CODE_EXTENSION> && java <FILENAME>",
		CodeExtension:   "java",
		OutputExtension: "",
	})
	Languages = append(Languages, language{
		Name:            "go",
		Id:              4,
		URL:             "http://localhost:3002/api/v1/recievecode",
		Script:          "go run <FILENAME>.<CODE_EXTENSION>",
		CodeExtension:   "go",
		OutputExtension: "",
	})
	Languages = append(Languages, language{
		Name:            "javascript",
		Id:              5,
		URL:             "http://localhost:3005/api/v1/recievecode",
		Script:          "node <FILENAME>.<CODE_EXTENSION>",
		CodeExtension:   "js",
		OutputExtension: "",
	})
	fmt.Println(Languages)
}

// Add New Language to the list of languages
func AddNewLanguages(name string, id int, url string, script string, codeExtension string, outputExtension string) {
	Languages = append(Languages, language{
		Name:            name,
		Id:              id,
		URL:             url,
		Script:          script,
		CodeExtension:   codeExtension,
		OutputExtension: outputExtension,
	})
	// add command to create deployment and service
	// then update url accordingly
	// url will be service name only so this will be easy

}

// returns Language URL corresponding to that Language Number
func ParseLanguageNumber(languageNumber int) string {
	for _, lang := range Languages {
		if lang.Id == languageNumber {
			return lang.URL
		}
	}
	return ""
}
