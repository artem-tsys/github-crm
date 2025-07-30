FROM node:22.5.1-alpine AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

CMD ["node", "dist/main"]
