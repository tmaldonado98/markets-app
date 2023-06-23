FROM node:20-alpine3.16

WORKDIR /markets-app-r

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD [ "npm", "start" ]