FROM node:10.11-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN apk --no-cache add util-linux \
  && apk --repository=http://nl.alpinelinux.org/alpine/edge/testing add vips \
  && apk --no-cache --repository=http://nl.alpinelinux.org/alpine/edge/testing \
    add --virtual .build-deps \
      vips-dev python build-base fftw-dev \
  && yarn \
  && apk del .build-deps

COPY . /usr/src/app

CMD ["yarn", "develop", "--host=0.0.0.0", "--port=8000"]
