package executer

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

func check(e error) {
	if e != nil {
		log.Println(e)
	}
}

// creates a file
func CreateFile(fileName string, CodeExtension string) (*os.File, error) {
	prePath := "files"

	fullyQualifiedFileName := "main" + "." + CodeExtension // here i have change file name to main
	if err := os.Mkdir(prePath+"/"+fileName, os.ModeDir); err != nil {
		log.Println(err)
	}
	// path := filepath.Join(prePath, fullyQualifiedFileName)
	path := prePath + "/" + fileName + "/" + fullyQualifiedFileName
	f, err := os.Create(path)
	if err != nil {
		log.Println(err)
		f.Close()
		return nil, err
	}
	return f, nil
}

// writes into a file
func WriteFile(f *os.File, content string) {

	_, err := f.WriteString(content)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()
}

// deletes a file
// we have to change this so that it can remove a folder.
func DeleteFile(fileName string, extension string) error {
	prePath := "files"
	// var fullyQualifiedFileName string

	// remove file with extension if it is not empty example .out and for empty example java compiled
	// if extension != "" {
	// 	fullyQualifiedFileName = fileName + "." + extension
	// } else {
	// 	fullyQualifiedFileName = fileName
	// }

	// creates something like files/<fullyQualifiedName>
	// path := filepath.Join(prePath, fullyQualifiedFileName)
	// path := filepath.Join(prePath, fileName)
	path := prePath + "/" + fileName
	// remove it
	// fmt.Println("instead of removing we doing this", path)
	err := os.RemoveAll(path)
	if err != nil {
		return err
	}
	return nil

	// currently this has problem as java create file for each class it creates and it will be difficult to remove those as no one knows where it will be created
	//  one solution can be that we create 1 folder for each request and thus when execution is complete we can remove that folder so that it doesn't affect working of other users.
}

func getExecutionCode(script string, filepath string, CodeExtension string, OutputExtension string) string {
	// script := os.Getenv("SCRIPT")
	// script := "python /app/files/<FILENAME>/main.<CODE_EXTENSION>"
	// script := `javac /app/files/<FILENAME>/main.java && java -cp /app/files/<FILENAME> Main`
	// script := "g++ /app/files/<FILENAME>/main.<CODE_EXTENSION> -o /app/files/<FILENAME>/main.<OUTPUT_EXTENSION> && /app/files/<FILENAME>/main.<OUTPUT_EXTENSION>"
	script = strings.Replace(script, "<FILENAME>", filepath, -1)
	script = strings.Replace(script, "<CODE_EXTENSION>", CodeExtension, -1)
	if OutputExtension != "" {
		script = strings.Replace(script, "<OUTPUT_EXTENSION>", OutputExtension, -1)
	}
	return script
}

func ExecuteFile(filename string, Script string, CodeExtension string, OutputExtension string, input string) (string, error) {

	// filePath := "files" + "/" + filename + "/" + "main" // here i have changed file name to main
	executionCode := getExecutionCode(Script, filename, CodeExtension, OutputExtension)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	outputFile := "/app/files/" + filename + "/output.msg"
	outputErr := "/app/files/" + filename + "/output.err"
	mapOutput := " > " + outputFile + " 2> " + outputErr
	myCommand :=
		// `" ` +
		executionCode
		// executionCode +
		// ` "` +
		// mapOutput

	println(myCommand)
	// fmt.Println(mapOutput)
	cmd := exec.CommandContext(ctx, "/bin/sh", "-c", myCommand+mapOutput)
	stdin, err := cmd.StdinPipe()
	if err != nil {
		log.Print(err)
	}
	go func() {
		defer stdin.Close()
		io.WriteString(stdin, input)
	}()

	tempOutput, err := cmd.CombinedOutput()
	if err != nil {
		if err.Error() == "signal: killed" {
			fmt.Println("handled error")
		}
		fmt.Println("this is", err)
		// return "", err
	}
	println(string(tempOutput))

	dat1, err := os.ReadFile(outputFile)
	check(err)
	dat2, err := os.ReadFile(outputErr)
	check(err)
	return string(dat1) + string(dat2), nil
	// return string(out), nil
}
