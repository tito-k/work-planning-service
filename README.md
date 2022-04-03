# Work Planning Service API

## Introduction

This README contains basic cloning and running instructions for you to be able to get the API with all the necessary
dependencies up and running locally. This file, though, does not contain exact details, and rules, that are to be
followed throughtout the development of the API.

## Cloning the repo

**NOTE:** Make sure you have Git installed on your system.

```bash
  # HTTPS
  $ git clone https://github.com/tito-k/work-planning-service.git

  # SSH
  $ git clone git@github.com:tito-k/work-planning-service.git

  $ cd work-planning-service
```

## Running locally - Manual

(Windows) To reduce any possible issues caused by terminal commands, make sure to use either bash terminal (available
when git is installed), Ubuntu terminal (accessible after WSL is installed) or any bash-based terminal you wish to use.

1. Configure [MongoDB](https://docs.atlas.mongodb.com/getting-started/) with Atlas

2. Configure .env file

   1. Create a copy of the .env.example file and rename it to .env
   2. Set the port (default is `3000`) and `NODE_ENV` (e.g. `localhost`)
   3. Set mongodb uri (connection string to your hosted Mongo database)

3. Run the following commands:

```bash
  $ npm install
  $ npm run dev #To run in development mode
```

## Running Tests

Throughtout the development it is important to run tests against the code to make sure that nothing broke.

```bash
  $ npm run test
```
