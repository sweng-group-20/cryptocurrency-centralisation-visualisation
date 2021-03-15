# cryptocurrency-centralisation-visualisation

Visualizing centralization in cryptocurrencies

## Getting started

### Running the website locally using docker

#### Prerequisites

You will need to have installed:

1. Docker

#### Running the website

1. Clone the repo
   ```
   git clone https://github.com/sweng-group-20/cryptocurrency-centralisation-visualisation.git
   ```
2. Navigate into the cloned GitHub repository
   ```
   cd cryptocurrency-centralisation-visualisation
   ```
3. Copy `.env_example` to `./docker/.env` and change `CORS_ORIGIN_URL`
4. Run the start script using `./docker/start_dev.sh` if on linux or `./docker/start_dev.ps1` if on windows. If the script does not work use the following command
   ```
   docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up -d --build
   ```

The local website is hosted on [`http://localhost:3000`](http://localhost:3000) and the api will be hosted on [`http://localhost:4000`](http://localhost:4000)

### Running the website locally

#### Prerequisites

You will need to have installed:

1. Node.js
2. Yarn

#### Running the website

1. Clone the repo
   ```
   git clone https://github.com/sweng-group-20/cryptocurrency-centralisation-visualisation.git
   ```
2. Navigate into the cloned GitHub repository
   ```
   cd cryptocurrency-centralisation-visualisation
   ```
3. Navigate into the server directory
   ```
   cd server
   ```
4. Run the `yarn install` script and the `yarn start:dev` script
   ```
   yarn install
   yarn start:dev
   ```
5. In another terminal navigate into the client directory
   ```
   cd client
   ```
6. Run the `yarn install` script and the `yarn start` script
   ```
   yarn install
   yarn start
   ```

The local website is hosted on [`http://localhost:3000`](http://localhost:3000) and the api will be hosted on [`http://localhost:4000`](http://localhost:4000)

## Authors

1. Lexes Jan Mantiquilla ([@lexesjan](https://github.com/lexesjan))
2. Tim Kelly ([@timotheekelly](https://github.com/timotheekelly))
3. Aodhán Keane ([@aodhanocathain](https://github.com/aodhanocathain))
