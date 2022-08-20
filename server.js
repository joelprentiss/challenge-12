const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');
const {Employee, Manager} = requiew('./emplopyees.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const main = () => {
    inquirer
      .prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Create New Department",
          "Create New Role",
          "Create New Employee",
          "Update Employee Role",
        ],
      })
      .then((answer) => {
        if (answer.choice === "View All Departments") {
          viewDepartments();
        }
        if (answer.choice === "View All Roles") {
          viewRoles();
        }
        if (answer.choice === "View All Employees") {
          viewEmployees();
        }
        if (answer.choice === "Create New Department") {
          createNewDept();
        }
        if (answer.choice === "Create New Role") {
          createNewRole();
        }
        if (answer.choice === "Create New Employee") {
          createNewEmployee();
        }
        if (answer.choice === "Update Employee Role") {
          updateRole();
        }
      });
  };
  
  const viewDepartments = () => {
    console.log("All departments");
    db.query("SELECT * FROM department;", [], (err, result) => {
      console.table(result);
      main();
    });
  };
  
  const viewRoles = () => {
    console.log("Viewing all roles");
    db.query("SELECT * FROM role;", [], (err, result) => {
      console.table(result);
      main();
    });
  };
  
  const viewEmployees = () => {
    console.log("Viewing all employees");
    db.query("SELECT * FROM employee;", [], (err, result) => {
      console.table(result);
      main();
    });
  };
  const createNewDept = () => {
    console.log("Create new department");
    inquirer
      .prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department?",
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO department (name) VALUES (?);",
          [answer.deptName],
          (err, result) => {
            console.log("Successfully added");
            main();
          }
        );
      });
  };
  const createNewEmployee = () => {
    console.log("Create new employee");
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Employee first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "Employee last name?",
        },
        {
          type: "input",
          name: "role_id",
          message: "New employee role?",
        },
        {
          type: "input",
          name: "manager_id",
          message: "New employees manager?",
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);",
          [
            answer.first_name,
            answer.last_name,
            answer.role_id,
            answer.manager_id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("Successfully added");
            main();
          }
        );
      });
  };
  const createNewRole = () => {
    db.query("SELECT * FROM department;", [], (err, result) => {
      const departmentList = result.map((e) => {
        return {
          name: e.name,
          value: e.id,
        };
      })
    
    console.log("Create new role");
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department is this role in?",
          choices: departmentList
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
          [answer.title, answer.salary, answer.department_id],
          (err, result) => {
            console.log("Successfully added");
            main();
          }
        );
      })
    })
  }
  
      const updateRole = () => {
        db.query("SELECT * FROM employee;", [], (err, result) => {
          const employees = result.map((e) => {
            return {
              name: e.first_name + " " + e.last_name,
              value: e.id,
            };
          });
      
          console.log("Update employee role");
          inquirer
            .prompt([
              // {
              //   type: "input",
              //   name: "employee_id",
              //   message: "What is the id of the employee you want to update?",
              // },
              {
                type: "list",
                name: "employee_id",
                message: "What is the id of the employee you want to update?",
                choices: employees,
              },
              {
                type: "input",
                name: "role_id",
                message: "What is the new role id for this employee?",
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET role_id = (?) where id = (?);",
                [answer.role_id, answer.employee_id],
                (err, result) => {
                  console.log("Successfully updated");
                  main();
                }
              );
            });
        });
  };