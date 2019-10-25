FROM node:10.16.3

RUN mkdir /app

RUN apt-get update
RUN npm i npm@latest - g

COPY . /app
WORKDIR /app
RUN npm install && npm cache clean --force
CMD npm start

EXPOSE 8002