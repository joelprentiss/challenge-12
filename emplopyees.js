class Employee {
    constructor (firstName, lastName, id, role, department, salary){
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.role = role,
    this.department = department;
    this.salary = salary;   
    }
    getName(){
        console.log(`Employee Name: ${this.firstName}+${this.lastName}`)
    }
    getRole(){
        console.log(`Employee role is ${this.role}`)
    }
    getDepartment(){
        console.log(`Employee Department: ${this.department}`)
    }
    getSalary(){
        console.log(`Employee Salary: ${this.salary}`)
    }
};

class Manager extends Employee{
    constructor (firstName, lastName, id, role, department, salary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.role = role,
        this.department = department;
        this.salary = salary; 
}}

module.exports ={Employee, Manager};