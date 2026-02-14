FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm install typescript --save-dev && npx tsc

ENV PORT=8080
ENV JWT_SECRET=freshmarket_jwt_secret_2026
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/index.js"]
