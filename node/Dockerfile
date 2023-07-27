FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install express --save && npm install mysql --save

COPY . .

EXPOSE 3000
