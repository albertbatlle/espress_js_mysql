drop schema if exists test;
create database test;

use test;

create table users(
    idUser int primary key auto_increment,
    userName varchar(100),
    email varchar(255),
    password varchar(255),
    createdAt datetime default current_timestamp
);