FROM node:slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]

# FROM node:14.14.0-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm i

# COPY . .

# CMD ["npm", "start"]
