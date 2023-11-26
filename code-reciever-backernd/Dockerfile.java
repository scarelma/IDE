FROM openjdk:slim-buster

WORKDIR /app

COPY code-reciever-backernd /app/code-reciever-backernd
# COPY . /app/

RUN mkdir /app/files

RUN chmod 777 /app/code-reciever-backernd

ENV CODE_EXTENSION=java
ENV SCRIPT="javac /app/files/<FILENAME>/main.<CODE_EXTENSION> && java -cp /app/files/<FILENAME> Main"

EXPOSE 3001

CMD [ "./code-reciever-backernd" ]
