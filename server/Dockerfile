# Install prod dependencies stage
FROM node:15-alpine as install_prod

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

# Run stage
FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY src ./src
COPY --from=install_prod /usr/src/app/node_modules ./node_modules

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "src/app.js"]
