FROM node:16.13.2-alpine3.15

LABEL maintainer="void* <voidp@protonmail.com>"

USER root

ENV APP /usr/src/app

RUN npm install pm2 -g

RUN npm install uuid

RUN npm install mapbox/node-pre-gyp

RUN npm install request

RUN npm install node-fetch

RUN npm install discord.js



COPY package.json /tmp/package.json

RUN cd /tmp && npm install --loglevel=warn \
  && mkdir -p $APP \
  && mv /tmp/node_modules $APP

COPY src $APP/src
COPY data $APP/data
COPY package.json $APP

WORKDIR $APP

CMD [ "pm2-runtime", "src/index.js" ]
