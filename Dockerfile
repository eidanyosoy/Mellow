FROM node:16.13.2-alpine3.15

LABEL maintainer="void* <voidp@protonmail.com>"

USER root

ENV APP /usr/src/app

RUN npm install -g npm@8.3.1

RUN npm install -g node@16.9.0 --force

RUN npm install -g pm2@5.1.2

RUN npm install -g sqlite3@4.2.0

RUN npm install -g uuid@8.3.2

RUN npm install -g python3

RUN npm install -g npm@8.3.1

RUN npm install -g node-pre-gyp@mapbox

RUN npm install -g request

RUN npm install -g node-fetch@2.6.5

RUN npm install -g discord.js@13.2.0



COPY package.json /tmp/package.json

RUN cd /tmp && npm install --loglevel=warn \
  && mkdir -p $APP \
  && mv /tmp/node_modules $APP

COPY src $APP/src
COPY data $APP/data
COPY package.json $APP

WORKDIR $APP

CMD [ "pm2-runtime", "src/index.js" ]
