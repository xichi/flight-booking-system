use mysql;
update user set host = '%' where user ='root';
ALTER USER 'root'@'%' IDENTIFIED BY '123456';
flush privileges;
create database test;
use test;
create table user
(
id int auto_increment primary key,
username varchar(64) unique not null,
email varchar(120) unique not null,
password_hash varchar(128) not null
);
insert into user values(1, "b18030407","474504964@qq.com","b18030407");
insert into user values(2, "b18030401","2351963425@qq.com","b18030401");