-- Esquemas necesarios para esta api
-- 1) general

-- Crear un esquema
CREATE SCHEMA attendance_control;

create table attendance_control.attendance (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    id_worker integer NOT NULL,
    date_attendance date NOT NULL DEFAULT CURRENT_DATE,
    check_in time,
    check_out time
)

create table attendance_control.users (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    id_worker integer NOT NULL UNIQUE,
    username varchar(100) NOT NULL UNIQUE,
    password varchar NOT NULL,
    role_id integer NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    created date DEFAULT CURRENT_DATE,
    updated date DEFAULT CURRENT_DATE
)

create table attendance_control.workers (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    identity_card integer NOT NULL UNIQUE,
    is_foreign boolean NOT NULL DEFAULT false,
    names varchar(160) NOT NULL,
    last_names varchar(160) NOT NULL,
    email varchar(200) DEFAULT '',
    phone varchar(20) DEFAULT '',
    gender_id integer NOT NULL DEFAULT 1,
    role_id integer NOT NULL,
    department_id integer NOT NULL,
    position_id integer NOT NULL,
    status varchar NOT NULL DEFAULT true,
    created date DEFAULT CURRENT_DATE,
    updated date DEFAULT CURRENT_DATE
)