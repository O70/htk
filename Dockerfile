FROM node:17.1.0-alpine3.14

LABEL author="THRAEX <THRAEX@aliyun.com>"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 9717

CMD ["npm", "start"]
