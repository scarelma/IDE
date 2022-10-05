FROM golang:latest

# Set the Current Working Directory inside the container
WORKDIR /app

#Downlaod necessary go modules 
COPY go.mod ./
COPY go.sum ./

RUN go mod download

#Copy the source from the current directory to the working Directory inside the container
COPY *.go ./

#Build the Go app
RUN go build -o /IDE

EXPOSE 8080

CMD [ "./IDE" ]
