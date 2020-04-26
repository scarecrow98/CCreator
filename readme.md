# CCreator application
CCreator is a SPA built with Angular as the front-end and Lumen as the back-end API. This app lets you create dynamic table-based registration systems. You can create "pages", each page contains user-defined data fields called "widgets". Every page has its own data table that stores the records saved to that particular page.
# Getting started
## Requirements for running CCreator locally
 - PHP 7.x
 - Angular CLI
 - Node JS with npm installed
 - Composer
 - MySQL server 8.x
## Setting up local environment
Create a database (let it be ccreator-central for the sake of simlicity) and create the schema from the database/scripts/central-db-schema.sql file. Also import the stored procedures from the sql files that start with "proc-".
Insert a user to the database using BCRYPT algo as the password hash.

Make a copy of the .env.example file in the root directory, rename that to .env and provide your database credentials.
## Install project dependencies
cd into the root dir of the project and run `composer install`, then cd into public/angular and run `npm install`. That process will download all the dependecies that Angular and Lumen need.
## Running the app
The Lumen API can be start from command line using the command `php -S localhost:8000 -t public` command.
The Angular dev server can be run by running `ng serve` in the public/angular directory. This will serve you app on localhost:4200.
## Deploying in production
First, you need to compile the angular project in production and upload the output to your webserver. It is a good practice to make an individual domain for you backend API. Do not forget to override the API url in the  angular http interceptor.
The Lumen API can be deployed accodring to the Lumen official documentation.