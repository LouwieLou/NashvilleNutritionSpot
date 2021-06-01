DROP DATABASE IF EXISTS menu_db;
CREATE DATABASE IF NOT EXISTS menu_db;
USE menu_db;


DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
	id INT,
    category VARCHAR(10),
    item_name VARCHAR(100),
    description VARCHAR(1000),
    price INT,
    
    CONSTRAINT PRIMARY KEY pk_items(id)
);

LOAD DATA INFILE "/var/lib/mysql-files/menu-db.csv"
INTO TABLE items
FIELDS TERMINATED BY ','
IGNORE 1 LINES
