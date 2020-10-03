FROM ubuntu:18.04

MAINTAINER Hemanth Battu "hbattu73@gmail.com"

RUN apt-get update -y 
RUN apt-get install -y python3-pip python3-dev
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./flask_app /app/flask_app

WORKDIR /app/flask_app/static

RUN npm install
RUN npm run build

WORKDIR ../


EXPOSE 5000

CMD [ "python3", "app.py" ]


