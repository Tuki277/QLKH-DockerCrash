FROM node:slim as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# FROM node:14.14.0-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm i

# COPY . .

# CMD ["npm", "run", "start"]
