create table users (
    id int primary key auto_increment,
    email varchar(255) unique,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    reg_date timestamp default CURRENT_TIMESTAMP,
    last_login_at timestamp,
    password char(100) not null
);

create table applications (
    id int primary key auto_increment,
    slug varchar(255) unique,
    name varchar(255) not null,
    description varchar(255) null,
    created_at timestamp default CURRENT_TIMESTAMP,
    created_by int not null references users,
    host varchar(255) default 'localhost',
    db_name varchar(255) not null
);