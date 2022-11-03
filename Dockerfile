FROM node:16

COPY ["package.json", "yarn.lock", "/usr/src/"]

WORKDIR /usr/src

RUN yarn install

COPY [".", "/usr/src/"]

RUN npm run build

EXPOSE 3000

CMD npm start


