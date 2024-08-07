-- Creates the tables necessary for the operation of the system
CREATE SCHEMA attendance_control;

create table attendance_control.attendance (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    worker_id integer NOT NULL,
    date_attendance date NOT NULL DEFAULT CURRENT_DATE,
    check_in time,
    check_out time
);

create table attendance_control.users (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    worker_id integer NOT NULL UNIQUE,
    username varchar(100) NOT NULL UNIQUE,
    password varchar NOT NULL,
    role_id integer NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    created date DEFAULT CURRENT_DATE,
    updated date DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS attendance_control.roles(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    role varchar(100) NOT NULL UNIQUE
);

ALTER TABLE attendance_control.attendance ADD CONSTRAINT fk_attendance_worker_id FOREIGN KEY (worker_id) references general.workers(id);

ALTER TABLE attendance_control.users ADD CONSTRAINT fk_users_worker_id FOREIGN KEY (worker_id) references general.workers(id);

ALTER TABLE attendance_control.users ADD CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) references attendance_control.roles(id);