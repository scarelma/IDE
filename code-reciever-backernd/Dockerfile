FROM python:3.11.0rc2-alpine3.16

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

RUN mkdir /app/files

RUN chmod 777 /app/code-reciever-backernd

EXPOSE 3001

CMD [ "./code-reciever-backernd" ]
