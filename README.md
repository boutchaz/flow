# Monorepo NX Test

This monorepo project is developed using NX, which allows managing multiple applications and libraries within a single codebase. It consists of two main applications: "api" developed with NestJS and "frontend" developed with Next.js. Additionally, there are three backend packages: "config" for managing configuration, "common" for common utilities, and "contracts" for managing types.

![AutoTrade](/screenshots/autotrade.png)
![Homepage](/screenshots/dashboard.png)


## Applications

### API

The "api" application is built with NestJS, a powerful framework for building scalable and efficient server-side applications. It serves as the backend for the test project. The main functionality of this application is to provide RESTful API endpoints to interact with the data.

### Frontend

The "frontend" application is developed using Next.js, a popular framework for building React applications. It serves as the frontend user interface for the test project. The frontend application communicates with the API to fetch and display the data stored in the database.
I used vitest as testing framework for the frontend where I mocked all the dependecies




## Backend Packages

### Config

The "config" package is responsible for managing configuration settings for the project. It provides a centralized location to store and access various configuration variables required by the applications.

### Common

The "common" package contains common utilities and functions that are shared across the project. It helps in avoiding code duplication and promotes reusability.

### Contracts

The "contracts" package focuses on managing types and interfaces used throughout the project. It ensures type safety and provides a consistent structure for the data shared between different modules.

## Stock Tracker Module

The first module developed for this test project is the "stock-tracker" module. It stores JSON data files and exposes a seed service to populate the data. SQLite was chosen as the database for simplicity. Migration scripts are provided to create the necessary database tables.

To facilitate the development process, a personal boilerplate was used. It offers generic CRUD (Create, Read, Update, Delete) functionality by extending the `CrudController`, which takes a generic entity for each module. Most of the logic related to this module is unit tested in the "engine" module.

## Transaction Module

Although not fully implemented, the "transaction" module was planned to handle the persistence of transaction-related data. This module could be developed in the future to provide additional functionality to the project.

Feel free to explore the codebase and make any necessary modifications or enhancements based on your requirements.

## Getting Started

1. Clone the repository.
2. Install the project dependencies by running `npm install` or `yarn install` for the apps and packages 
3. Run the migration scripts to set up the database tables.
4. run seeds to populate the database with flow/apps/api/src/stock-tracker/data
5. Start the API and frontend applications using `npm run start:dev` and `npm run dev` respectively.
6. Access the frontend application in your browser at the specified URL.




