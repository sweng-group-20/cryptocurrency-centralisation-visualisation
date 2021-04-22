# cryptocurrency-centralisation-visualisation

![banner](.github/images/dashboard.gif)

This project aims to design a consolidated GUI dashboard to visualize the current state of centralization in significant cryptocurrencies.

## Getting started

### API Documentation

![api-docs](.github/images/api-docs.gif)

The documentation for the API created to fetch the data for the graphs can be found in the `/api-docs` route

### Running the website using Docker

#### Prerequisites

You will need to have installed:

1. Docker

#### Running the website for production using Docker Hub

The built images for this project can be found on [Docker Hub](https://hub.docker.com/u/swenggroup20).

1. Create a `docker-compose.yml` file. An example one is found below

   ```yaml
   version: "3.9"
   services:
   client:
     image: swenggroup20/cryptocurrency-centralisation-visualisation-client:latest
     container_name: cryptocurrency-centralisation-visualisation-client
     restart: always
     ports:
       - "3000:3000"
     environment:
       - NODE_ENV=production
     networks:
       - network
     stdin_open: true
     tty: true

   server:
     image: swenggroup20/cryptocurrency-centralisation-visualisation-server:latest
     container_name: cryptocurrency-centralisation-visualisation-server
     restart: always
     ports:
       - "4000:4000"
     environment:
       - NODE_ENV=production
       - CORS_ORIGIN_URL=${CORS_ORIGIN_URL}
       - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
       - GITHUB_TOKEN=${GITHUB_TOKEN}
     networks:
       - network
     depends_on:
       - db

   db:
     image: swenggroup20/cryptocurrency-centralisation-visualisation-database:latest
     container_name: cryptocurrency-centralisation-visualisation-database
     restart: always
     environment:
       POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
     networks:
       - network
     volumes:
       - database_data:/var/lib/postgresql/data

   networks:
   network:
     name: cryptocurrency-centralisation-visualisation-network
     driver: bridge

   volumes:
   database_data:
     name: cryptocurrency-centralisation-visualisation-database-data
   ```

2. Create a `.env` file in the same directory. An example one is found below
   ```dosini
   # URL of the host website
   CORS_ORIGIN_URL=https://example.com:3000
   # URL of the API
   API_HOST=https://example.com:4000
   # Password for the PostgreSQL database
   POSTGRES_PASSWORD=strong_password
   # GitHub Token, can be created by following https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
   GITHUB_TOKEN=d645b99a197d32a71de199e329f9c986b9427348
   ```
3. Run `docker-compose up` command
   ```
   docker-compose up
   ```

You can then add TLS/SSL using a reverse proxy. You can use any reverse proxy software you like e.g. NGINX

#### Running the website for development

1. Clone the repo
   ```
   git clone https://github.com/sweng-group-20/cryptocurrency-centralisation-visualisation.git
   ```
2. Navigate into the cloned GitHub repository
   ```
   cd cryptocurrency-centralisation-visualisation
   ```
3. Copy `.env_example` to `./docker/.env` and change `CORS_ORIGIN_URL`, `API_HOST`, `POSTGRES_PASSWORD` and `GITHUB_TOKEN`
4. Run the start script using `./docker/dev.sh` if on linux or `./docker/dev.ps1` if on windows.

The local website is hosted on [`http://localhost:3000`](http://localhost:3000) and the api will be hosted on [`http://localhost:4000`](http://localhost:4000)

### Running the website without Docker

#### Prerequisites

You will need to have installed:

1. Node.js
2. Yarn

#### Running the website for development

1. Clone the repo
   ```
   git clone https://github.com/sweng-group-20/cryptocurrency-centralisation-visualisation.git
   ```
2. Navigate into the cloned GitHub repository
   ```
   cd cryptocurrency-centralisation-visualisation
   ```
3. Ensure that the environment variables `CORS_ORIGIN_URL` and `API_HOST`. For the purposes of development they can be set to `http://localhost:3000` and `http://localhost:4000` respectively.
4. Navigate into the server directory
   ```
   cd server
   ```
5. Run the `yarn install` script and the `yarn start:dev` script
   ```
   yarn install
   yarn start:dev
   ```
6. In another terminal navigate into the client directory
   ```
   cd client
   ```
7. Run the `yarn install` script and the `yarn start` script
   ```
   yarn install
   yarn start
   ```

The local website is hosted on [`http://localhost:3000`](http://localhost:3000) and the api will be hosted on [`http://localhost:4000`](http://localhost:4000)

| ℹ️  | To setup the application layer graphs, you must have access to an instance a PostgreSQL database |
| :-: | :----------------------------------------------------------------------------------------------- |

## Technologies used

1. docker v20.10.6
2. yarn v1.22.5
3. node.js v15.14.0
4. postgresql v13.2.0
5. nginx v1.19.2

### Front-end

1. leaflet v1.7.1
2. nivo v0.31.0
   1. @nivo/core v0.67.0
   2. @nivo/geo v0.67.0
   3. @nivo/line v0.67.0
   4. @nivo/pie v0.67.0
   5. @nivo/tooltip v0.67.0
3. react v17.0.1
   1. react-dom: v17.0.1
   2. react-leaflet: v3.1.0
   3. react-linkify: v1.0.0-alpha
   4. react-router-dom: v5.2.0
   5. react-scripts: 4.0.3
4. prop-types v15.7.2

### Back-end

1. cheerio v1.0.0-rc.5
2. cors v2.8.5
3. express v4.17.1
4. helmet v4.4.1
5. morgan v1.10.0
6. node-cron v3.0.0
7. node-fetch v2.6.1
8. swagger-ui-express v4.1.6
   1. swagger-jsdoc v6.0.0
   2. openapi-types v7.2.3
9. p-limit: v3.1.0
10. pg: v8.5.1
11. pino: v6.11.2

## Authors

1. Lexes Jan Mantiquilla ([@lexesjan](https://github.com/lexesjan))
2. Tim Kelly ([@timotheekelly](https://github.com/timotheekelly))
3. Aodhán Keane ([@aodhanocathain](https://github.com/aodhanocathain))
4. Stephen Davis ([@SteDavis20](https://github.com/SteDavis20))
5. Alex Robert Mahon ([@juuiko](https://github.com/juuiko))
6. Leona Wolff ([@leonawolff](https://github.com/leonawolff))
