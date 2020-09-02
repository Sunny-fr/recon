FROM jrottenberg/ffmpeg:4.1-alpine
FROM node:12-alpine as server
# copy ffmpeg bins from first image
COPY --from=0 / /

WORKDIR /usr/src/app/server
COPY server/package.json .

#RUN npm install --verbose --loglevel silly

RUN npm install

COPY server .

FROM node:12-alpine as front

WORKDIR /usr/src/app/front

COPY front .
ARG build_front=false
RUN if [ "$build_front" = "true" ]; then npm rebuild node-sass && npm install && npm run build; fi

FROM jrottenberg/ffmpeg:4.1-alpine
FROM node:12-alpine as recon
# copy ffmpeg bins from first image
COPY --from=0 / /

COPY --from=server /usr/src/app/server /usr/src/app/server
COPY --from=front /usr/src/app/front/build /usr/src/app/server/public
#COPY front/build /usr/src/app/build/
#ARG build_front=false
#RUN if [ "$build_front" = "true" ]; then rm -fr /usr/src/app/build/ && cp -R /usr/src/app/server/public /usr/src/app/build;  fi

#RUN apk add --no-cache bash

WORKDIR /usr/src/app/server

CMD [ "npm", "start"]
