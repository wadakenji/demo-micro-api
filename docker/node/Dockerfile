FROM node:12.18-alpine

RUN apk update && \
    yarn install

COPY ./src/ /micro-test/

WORKDIR /micro-test