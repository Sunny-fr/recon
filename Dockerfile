FROM jrottenberg/ffmpeg:4.1-alpine as ffmpeg
FROM node:12-alpine as server
# copy ffmpeg bins from first image
COPY --from=0 / /

WORKDIR /usr/src/app/server
COPY server/package.json .

RUN npm install

COPY server .

FROM node:12-alpine as front

WORKDIR /usr/src/app/front

COPY front .
ARG build_front=false
RUN npm rebuild node-sass && npm install && npm run build

#FROM jrottenberg/ffmpeg:4.1-alpine
#FROM node:12-alpine as recon
## copy ffmpeg bins from first image
#COPY --from=0 / /
FROM dpokidov/imagemagick as imagick
FROM server
COPY --from=ffmpeg / /
COPY --from=imagick / /


COPY --from=server /usr/src/app/server /usr/src/app/server
COPY --from=front /usr/src/app/front/build /usr/src/app/server/public

WORKDIR /usr/src/app/server

CMD [ "npm", "start"]
