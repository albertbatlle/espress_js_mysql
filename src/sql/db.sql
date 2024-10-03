DROP DATABASE IF EXISTS express_mysql_template;
CREATE DATABASE express_mysql_template;
USE express_mysql_template;

CREATE TABLE users (
    id varchar(255) primary key,
    username varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(255) not null,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp on update current_timestamp
);