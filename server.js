const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');
const {Employee, Manager} = requiew('./emplopyees.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to database.`)
  );

  inquirer
  .prompt([
        {
            type: 'input',
            name: 'first name',
            message: 'Enter new employee first name'
        },
        {
            type: 'input',
            name: 'last name',
            message: 'Enter new emplotee last name'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter employee role',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is employees salary',
        },
        {
            type:'list',
            name: 'manager',
            message: 'Who is this employees manager?',
            choices: `${Manager}`
        },

    ]
  )
 