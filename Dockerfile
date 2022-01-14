FROM node:fermium-buster

LABEL maintainer="eidanyosoy* <eidanyosoy@gmail.com>"

USER root

ENV APP /usr/src/app

RUN npm install -g pm2@5.1.2

COPY package.json /tmp/package.json

RUN cd /tmp && npm install --loglevel=warn \
  && mkdir -p $APP \
  && mv /tmp/node_modules $APP

COPY src $APP/src
COPY data $APP/data
COPY package.json $APP

WORKDIR $APP

CMD [ "pm2-runtime", "src/index.js" ]
