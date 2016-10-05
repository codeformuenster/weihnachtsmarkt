FROM ruby:onbuild

ENV NODE_VERSION 4.6.0

RUN wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz && \
  tar xzf node-v$NODE_VERSION-linux-x64.tar.gz && \
  mv node-v$NODE_VERSION-linux-x64/bin/* /usr/local/bin/ && \
  mv node-v$NODE_VERSION-linux-x64/lib/* /usr/local/lib/ && \
  mv node-v$NODE_VERSION-linux-x64/include/* /usr/local/include/ && \
  rm -rf node-v$NODE_VERSION-linux-x64*

RUN npm install -g bower jake

CMD ["jekyll","s"]
