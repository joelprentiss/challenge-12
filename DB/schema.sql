DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
    id INT NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id: INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
    PRIMARY KEY (id),
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
    manager_id INT
    FOREIGN KEY (manager_id)
    REFERENCES manager(id)
    ON DELETE SET NULL
    PRIMARY KEY(id)
);

CREATE TABLE manager(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
    PRIMARY KEY (id)
)