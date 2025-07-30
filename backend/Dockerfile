FROM node:22.5.1-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS dev
CMD ["npm", "run", "start:dev"]

