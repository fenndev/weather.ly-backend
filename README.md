# weather.ly-backend

## Overview

The `weather.ly-backend` repository is the server-side portion of the [weather.ly](https://github.com/fenndev/weather.ly) project. This is a RESTful API built using Express.js and TypeScript, designed to fetch and serve real-time weather data.

## Local Development

To run this project, you'll need to have Node.js and npm installed on your local machine.

Start by cloning the repository to your local machine:

```
git clone https://github.com/<YourUserName>/weather.ly-backend.git
```

### Set up the Environment Variables

This backend fetches its weather data from the OpenWeatherMap API. In order to interface with the OpenWeatherMap API, you must supply your own API key. This key should be placed in a `.env` file in the root directory of the project. 

Additionally, you must supply a `PORT` variable to specify the port you would like your local development server to use.Your `.env` file should look something like this:

```
PORT=<Port Number>
API_KEY=<Your API Key>
```

Remember to replace `<Your API Key>` with your actual OpenWeatherMap API key and `<Port Number>` with the port you want to run the dev server on.

### Install dependencies

Once you have cloned the repository and added your OpenWeatherMap API key, navigate into the directory and install the project's dependencies:

```
cd weather.ly-backend
npm install
```

## Running the Project

To start the local development server, use the following command:

```
npm run dev
```

For building the project, use:

```
npm run build
```

## License

This project, as well as the [frontend](https://github.com/fenndev/weather.ly) is licensed under the GPL-3.0.