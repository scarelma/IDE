FROM golang:latest

# Set the Current Working Directory inside the container
WORKDIR /app

#Downlaod necessary go modules 
COPY go.* /app/
# COPY go.sum /app/go.sum

# RUN ls
RUN go mod download

# #Copy the source from the current directory to the working Directory inside the container
COPY . .

# #Build the Go app
RUN go build -o /app/IDE

EXPOSE 5000

CMD [ "/app/IDE" ]


# CMD ["sh", "-c", "sleep infinity"]