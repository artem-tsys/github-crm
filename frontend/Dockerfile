FROM node:22.5.1-alpine AS builder

WORKDIR /app

 COPY . .
 RUN npm install
 RUN npm run build
 RUN npm install -g serve

 CMD ["serve", "-s", "dist"]
