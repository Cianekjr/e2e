# syntax=docker/dockerfile:1
FROM synthetixio/docker-e2e:18.16-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

FROM base as test

# RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
# RUN yarn config delete proxy && yarn config delete https-proxy && yarn config delete registry
# RUN yarn cache clean --force
RUN yarn install --network-timeout 300000
COPY . .
