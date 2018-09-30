DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE warehouse (
  item_id INT(4) PRIMARY KEY NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price DECIMAL(10, 2),
  stock_quantity INTEGER
);

-- Creates new rows containing data in all named columns --
INSERT INTO warehouse (item_id, product_name, department_name, price, stock_quantity)
VALUES
(0001, "Cat Toy", "Pets", 5.99, 23),
(0002, "Dog Toy", "Pets", 7.99, 16),
(0003, "Playstation 4", "Electronics", 299.99, 54),
(0004, "Xbox One", "Electronics", 299.99, 78),
(0005, "Xiaomi Redmi Note 5", "Electronics", 218.55, 12),
(0006, "iPhone X", "Electronics", 1165.00, 112),
(0007, "Baseball Bat", "Sporting Goods", 39.99, 64),
(0008, "Soccer Ball", "Sporting Goods", 29.99, 36),
(0009, "Luxury Sofa", "Furniture", 1050.00, 10),
(0010, "Used Leather Chair", "Furniture", 155.55, 3);