#скачивание образа установленных компонентов для Node.js
#разделение пакетов
FROM node:22.17.1-bullseye AS packages
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM packages as build
COPY ./src ./src
COPY ./public ./public
COPY ./webpack ./webpack
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

FROM build
ENTRYPOINT [ "npm", "run", "start" ]
