FROM node:20-alpine3.16

WORKDIR /markets-app

COPY package*.json ./

RUN npm install 

COPY . .

RUN next build

CMD [ "next", "start" ]