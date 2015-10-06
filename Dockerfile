FROM ruby:onbuild

RUN wget https://nodejs.org/dist/v4.1.1/node-v4.1.1-linux-x64.tar.gz && \
  tar xzf node-v4.1.1-linux-x64.tar.gz && \
  mv node-v4.1.1-linux-x64/bin/* /usr/local/bin/ && \
  mv node-v4.1.1-linux-x64/lib/* /usr/local/lib/ && \
  mv node-v4.1.1-linux-x64/include/* /usr/local/include/ && \
  rm -rf node-v4.1.1-linux-x64*

RUN npm install -g bower jake

CMD ["jekyll","s"]
