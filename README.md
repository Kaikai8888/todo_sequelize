# Expense Tracker
A simple expense tracking web app to help you manage your todos.

## Features
* create account with email or facebook account to  manage your todos
* browse all todos on home page
* click create button to create a new todo
* click edit button to edit existing todo's name or check/uncheck todos
* click delete button to delete todo

## Prerequisite
* bcryptjs: 2.4.3
* body-parser: 1.19.0
* connect-flash: 0.1.1
* dotenv: 8.2.0
* express: 4.17.1
* express-handlebars: 5.1.0
* express-session: 1.17.1
* method-override: 3.0.0
* mysql2: 2.2.5
* passport: 0.4.1
* passport-facebook: 3.0.0
* passport-local: 1.0.0
* sequelize: 6.3.5,
* sequelize-cli: 6.2.0

## Installation
1. Enter ` git clone https://github.com/Kaikai8888/todo_sequelize.git ` in the terminal to download the project folder
2. Install mySQL and use mySQL workbench to create the database,`todo_sequelize` with following SQL script
```
drop database if exists todo_sequelize;
CREATE DATABASE todo_sequelize;
USE todo_sequelize;
```
3. Follow `.env.example` to create `.env` file to set up environmental variables
4. Enter `npx sequelize db:migrate` in the terminal to create tables in the database
5. Enter `npx sequelize db:seed:all` in the terminal to create seed data
6. Enter `npm run dev` in the terminal to run app.js with nodemon to start local server 
7. Enter http://localhost:3000 in the browser and visit the website

