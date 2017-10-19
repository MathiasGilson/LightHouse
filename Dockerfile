FROM node:8

RUN rm -rf /tmp/node_modules
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn --production

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app
ADD . /opt/app

CMD ["npm", "start"]
