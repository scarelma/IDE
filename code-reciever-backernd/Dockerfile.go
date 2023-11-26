FROM golang:alpine3.16

WORKDIR /app

COPY code-reciever-backernd /app/code-reciever-backernd
# COPY . /app/

RUN mkdir /app/files

RUN chmod 777 /app/code-reciever-backernd

ENV CODE_EXTENSION=go
ENV SCRIPT="go run /app/files/<FILENAME>/main.<CODE_EXTENSION>"

EXPOSE 3001

CMD [ "./code-reciever-backernd" ]
