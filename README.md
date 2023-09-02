# IDE

##################

to run this project you need to install the following:

Golang : Golang 1.19.2 was used to build this project
Docker
Docker-compose

##################

### How to run
1. Clone the project
2. cd into the project directory and then in reciever directory to start the project in order.
3. Open Dockerfile and select the language you want to build the image with
   For example:
      Here I will use python
        `FROM python:3.9.6-slim-buster `
        uncomment above FROM line and make sure to comment out the other FROM line
        similarly below you will see the env variables for the python image
        uncomment the python env variables and make sure to comment out the other env variables
        ```
        ENV CODE_EXTENSION=py
        ENV SCRIPT="python /app/files/<FILENAME>/main.<CODE_EXTENSION>"
        ```
    then save the file and run the following command
    `docker build -t <image_name> . `
    for image_name choose something relevant to the language you are using
    for example:
    `docker build -t prb:1 .` prb stands for python reciever backend
4. Continue the above steps for all the languages available in the project
5. cd into the project directory 
6. Run `docker-compose up` to start the project
7. cd into the project directory and then in sender directory
8. Run `go run main.go` to start the sender

    ``` application will be available at localhost:5000```
        
