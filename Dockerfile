# syntax=docker/dockerfile:1
FROM synthetixio/docker-e2e:16.17-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

FROM base as test
# RUN yarn --frozen-lockfile --no-audit
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN npm config rm proxy 
RUN npm config rm https-proxy
RUN yarn config delete proxy
RUN yarn config delete https-proxy
RUN yarn config delete https-proxy
RUN yarn config delete registry
RUN yarn cache clean --force
RUN yarn install --network-timeout 300000
COPY . .
