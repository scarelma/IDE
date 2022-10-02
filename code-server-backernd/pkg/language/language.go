package language

import "fmt"

type language struct {
	Name string
	Id   int
	URL  string
}

var Languages []language

func AddInitLanguages() {
	Languages = append(Languages, language{Name: "python", Id: 1, URL: "http://127.0.0.1:3001/api/v1/recievecode"})
	Languages = append(Languages, language{Name: "c++", Id: 2, URL: "https://cpp.com"})
	fmt.Println(Languages)
}

func AddNewLanguages(name string, id int, url string) {
	Languages = append(Languages, language{Name: name, Id: id, URL: url})

}

func ParseLanguageNumber(languageNumber int) string {
	// fmt.Println(Languages)
	for _, lang := range Languages {
		// fmt.Println(lang.Id)
		// fmt.Println(lang.URL)
		if lang.Id == languageNumber {
			return lang.URL
		}
	}
	return ""
}
