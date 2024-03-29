# Install prod dependencies stage
FROM node:15-alpine as install_prod

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

# Build stage
FROM node:15-alpine as build

ARG API_HOST

WORKDIR /usr/src/app

COPY package.json craco.config.js tailwind.config.js .eslintrc.js .prettierrc.js ./
COPY src ./src
COPY public ./public
COPY --from=install_prod /usr/src/app/node_modules ./node_modules

ENV REACT_APP_API_HOST=${API_HOST}

RUN yarn build

# Run stage
FROM nginx:1.19.2-alpine

COPY nginx.conf /etc/nginx

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/build ./

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]