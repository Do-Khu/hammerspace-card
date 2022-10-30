FROM node:latest
WORKDIR /
COPY package*.json ./
COPY .env ./

RUN npm install
COPY . .

RUN npm run build
EXPOSE 9152

CMD ["node", "bin/index.js"]