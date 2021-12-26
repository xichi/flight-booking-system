USE mysql;

UPDATE
  user
SET
  host = '%'
WHERE
  user = 'root';

ALTER USER 'root' @'%' IDENTIFIED BY '123456';

flush privileges;

CREATE DATABASE flight;

USE flight;

CREATE TABLE sys_user (
  user_id int auto_increment,
  user_name varchar(64) UNIQUE NOT NULL,
  user_email varchar(120) UNIQUE NOT NULL,
  user_passwd varchar(128) NOT NULL,
  certification_type int,
  certification_number varchar(64),
  telephone int,
  sex int NOT NULL DEFAULT 0,
  age int NOT NULL DEFAULT 0,
  balance int NOT NULL DEFAULT 0,
  address varchar(120),
  PRIMARY KEY (user_id)
);

CREATE TABLE sys_admin (
  admin_id int auto_increment,
  admin_name varchar(64) UNIQUE NOT NULL,
  admin_email varchar(120) UNIQUE NOT NULL,
  admin_passwd varchar(128) NOT NULL,
  PRIMARY KEY (admin_id)
);

CREATE TABLE flight (
  flight_id int auto_increment,
  flight_model varchar(64) NOT NULL,
  from_city varchar(64) NOT NULL,
  to_city varchar(64) NOT NULL,
  from_airport varchar(64) NOT NULL,
  to_airport varchar(64) NOT NULL,
  departure_time timestamp NOT NULL,
  arrival_time timestamp NOT NULL,
  original_price int NOT NULL,
  current_price int NOT NULL,
  remain_seats int NOT NULL,
  PRIMARY KEY (flight_id)
);


CREATE TABLE order_record (
  order_id int auto_increment,
  user_id int,
  flight_id int,
  order_time timestamp NOT NULL,
  order_price int NOT NULL,
  check_status int NOT NULL DEFAULT 0,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES sys_user(user_id),
  FOREIGN KEY (flight_id) REFERENCES flight(flight_id)
);

-- 初始化数据
INSERT INTO
  sys_admin
VALUES
(1, "admin", "admin@njupt.edu.cn", "admin");

INSERT INTO
  sys_admin
VALUES
(2, "b18030407", "474504964@qq.com", "b18030407");

INSERT INTO
  sys_admin
VALUES
(3, "b18030410", "2351963425@qq.com", "b18030410");

INSERT INTO
  sys_user (user_id, user_name, user_email, user_passwd)
VALUES
(1, "b18030407", "474504964@qq.com", "b18030407");
