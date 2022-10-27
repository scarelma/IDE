# FROM golang:alpine3.16
FROM node:lts-alpine3.15
# FROM python:3.12.0a1-slim-buster
# FROM gcc:9.5.0
# FROM openjdk:slim-buster

# Set the Current Working Directory inside the container
WORKDIR /app

#Downlaod necessary go modules 
# COPY go.mod ./
# COPY go.sum ./

# RUN go mod download

# #Copy the source from the current directory to the working Directory inside the container
# COPY *.go ./

# #Build the Go app
# RUN go build -o /IDE
COPY code-reciever-backernd /app/code-reciever-backernd
# COPY . /app/

RUN mkdir /app/files

RUN chmod 777 /app/code-reciever-backernd


# for golang
# ENV CODE_EXTENSION=go
# ENV SCRIPT="go run /app/files/<FILENAME>/main.<CODE_EXTENSION>"

# for js
ENV CODE_EXTENSION=js
ENV SCRIPT="node /app/files/<FILENAME>/main.<CODE_EXTENSION>"

# for python
# ENV CODE_EXTENSION=py
# ENV SCRIPT="python /app/files/<FILENAME>/main.<CODE_EXTENSION>"

# for c++
# ENV CODE_EXTENSION=cpp
# ENV OUTPUT_EXTENSION=out
# ENV SCRIPT="g++ /app/files/<FILENAME>/main.<CODE_EXTENSION> -o /app/files/<FILENAME>/main.<OUTPUT_EXTENSION> && /app/files/<FILENAME>/main.<OUTPUT_EXTENSION>"

# for java
# ENV CODE_EXTENSION=java
# ENV SCRIPT="javac /app/files/<FILENAME>/main.<CODE_EXTENSION> && java -cp /app/files/<FILENAME> Main"

EXPOSE 3001

CMD [ "./code-reciever-backernd" ]
