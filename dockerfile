FROM node:20.16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4173
CMD [ "yarn", "serve" ]