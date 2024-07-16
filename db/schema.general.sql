-- Crear un esquema
CREATE SCHEMA general;

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

CREATE TABLE general.location(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    person_id integer NOT NULL UNIQUE,
    state_id integer NOT NULL,
    municipality_id integer NOT NULL,
    parish_id integer NOT NULL,
    address text DEFAULT ''
);