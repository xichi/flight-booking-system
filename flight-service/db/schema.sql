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
  certificaiton_type int NOT NULL,
  certification_number int NOT NULL,
  telephone int NOT NULL,
  sex int NOT NULL DEFAULT 0,
  age int NOT NULL,
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

CREATE TABLE airplane_model (
  model_id int auto_increment,
  model_name varchar(64) UNIQUE NOT NULL,
  max_sail_length int NOT NULL,
  first_class_seats int NOT NULL,
  business_class_seats int NOT NULL,
  economy_class_seats int NOT NULL,
  first_class_per_sail_price int NOT NULL,
  business_class_per_sail_price int NOT NULL,
  economy_class_per_sail_price int NOT NULL,
  PRIMARY KEY (model_id)
);

CREATE TABLE order_record (
  order_id int auto_increment,
  flight_number int NOT NULL,
  user_id int,
  flight_model int,
  order_time timestamp,
  order_price int NOT NULL,
  check_status int NOT NULL DEFAULT 0,
  grade int NOT NULL DEFAULT 0,
  seat_number int NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES sys_user(user_id),
  FOREIGN KEY (flight_model) REFERENCES airplane_model(model_id)
);

CREATE TABLE flight (
  flight_id int auto_increment,
  flight_model int,
  from_city varchar(64) NOT NULL,
  to_city varchar(64) NOT NULL,
  from_airport varchar(64) NOT NULL,
  to_airport varchar(64) NOT NULL,
  sail_length int NOT NULL,
  original_price int NOT NULL,
  current_price int NOT NULL,
  discount int DEFAULT 0,
  departure_time timestamp,
  arrival_time timestamp,
  status varchar(64) NOT NULL,
  first_class_remain_seats int NOT NULL,
  business_class_remain_seats int NOT NULL,
  economy_class_remain_seats int NOT NULL,
  available_seats text,
  flight_number int,
  PRIMARY KEY (flight_id),
  FOREIGN KEY (flight_model) REFERENCES airplane_model(model_id)
);

-- 初始化数据
INSERT INTO
  sys_admin
VALUES
(1, "b18030407", "474504964@qq.com", "b18030407");

INSERT INTO
  sys_admin
VALUES
(2, "b18030401", "2351963425@qq.com", "b18030401");