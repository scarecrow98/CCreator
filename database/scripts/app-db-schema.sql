create table users (
    id int primary key AUTO_INCREMENT,
    central_user_id int not null,
    display_name varchar(100) not null
);

create table pages (
    id int primary key AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NULL,
    icon varchar(30) NULL,
    color char(9) not null,
    created_by int not null references users,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    last_modified_by int references users
);

create table widget_types (
    id int primary key AUTO_INCREMENT,
    name varchar(30) not null,
    display_name varchar(50) not null
);

create table page_widgets (
    id int primary key AUTO_INCREMENT,
    page_id int not null references pages,
    widget_type_id int not null references widget_types,
    label varchar(255) not null,
    width int not null default 300,
    height int not null default 100,
    default_value varchar(1000),
    x int not null default 0,
    y int not null default 0,
    multi_line tinyint not null default 0
);

create table page_relations (
    parent_page_id int not null references pages,
    child_page_id int not null references pages
);

create table page_records (
    id int primary key AUTO_INCREMENT,
    page_id int not null references pages,
    created_by int not null references users,
    created_at timestamp default CURRENT_TIMESTAMP,
    last_modified_by int not null references users,
    last_modified_at timestamp DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
);

create table page_record_value (
    record_id int not null references page_records,
    page_widget_id int not null references page_widgets,
    widget_value varchar(1000) null,
    fulltext(widget_value)
);

create table record_relations (
    parent_record_id int not null references page_records,
    child_record_id int not null references page_records
);