FROM gcc:9.5.0

WORKDIR /app

COPY code-reciever-backernd /app/code-reciever-backernd
# COPY . /app/

RUN mkdir /app/files

RUN chmod 777 /app/code-reciever-backernd


ENV CODE_EXTENSION=cpp
ENV OUTPUT_EXTENSION=out
ENV SCRIPT="g++ /app/files/<FILENAME>/main.<CODE_EXTENSION> -o /app/files/<FILENAME>/main.<OUTPUT_EXTENSION> && /app/files/<FILENAME>/main.<OUTPUT_EXTENSION>"

EXPOSE 3001

CMD [ "./code-reciever-backernd" ]
