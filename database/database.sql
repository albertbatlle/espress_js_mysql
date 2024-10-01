drop schema if exists test;
create database test;
use test;

-- TODO: Crear la tabla de productos

create table products (
    idProduct varchar(255) primary key,
    name_product varchar(255),
    uds int,
    created datetime default current_timestamp
);