FROM node:18.20.4-alpine

WORKDIR /app
COPY ./package*.json ./
RUN npm install -g npm@10.9.2
RUN npm install --force
RUN npm install -g http-server
COPY . .
RUN npm run build
EXPOSE 8081

CMD ["npm", "run", "prod"]