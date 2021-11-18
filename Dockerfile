FROM node:17.1.0-alpine3.14

LABEL author="THRAEX <THRAEX@aliyun.com>"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN wget https://www.python.org/downloads/release/python-3613/

ENV NODE_OPTIONS=--openssl-legacy-provider

VOLUME ["/app/db.tmp"]

EXPOSE 9717
EXPOSE 9718

CMD ["npm", "start"]
