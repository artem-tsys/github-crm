FROM node:22.5.1-alpine AS base
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

CMD ["node", "dist/main"]

