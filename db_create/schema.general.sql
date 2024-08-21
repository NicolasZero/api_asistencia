-- Create tables with private general data

CREATE SCHEMA general;

-- This table is incomplete and this table is for testing
CREATE TABLE IF NOT EXISTS general.workers (
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    identity_card integer NOT NULL UNIQUE,
    is_foreign boolean NOT NULL DEFAULT false,
    names varchar(160) NOT NULL,
    last_names varchar(160) NOT NULL,
    gender_id integer NOT NULL DEFAULT 1,
    department_id integer NOT NULL,
    position_id integer NOT NULL,
    status varchar NOT NULL DEFAULT true,
    created date DEFAULT CURRENT_DATE,
    updated date DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS general.location(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    worker_id integer NOT NULL UNIQUE,
    state_id integer NOT NULL,
    municipality_id integer NOT NULL,
    parish_id integer NOT NULL,
    address text DEFAULT ''
);

CREATE TABLE IF NOT EXISTS general.contact(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    worker_id integer NOT NULL UNIQUE,
    email varchar(200) DEFAULT '',
    phone varchar(20) DEFAULT '',
    phone2 varchar(20) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS general.department(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    department varchar(200) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS general.position(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    position varchar(200) NOT NULL UNIQUE
);

ALTER TABLE general.workers ADD CONSTRAINT fk_workers_gender_id FOREIGN KEY (gender_id) references genders(id);

ALTER TABLE general.workers ADD CONSTRAINT fk_workers_department_id FOREIGN KEY (department_id) references general.department(id);

ALTER TABLE general.workers ADD CONSTRAINT fk_workers_position_id FOREIGN KEY (position_id) references general.position(id);

ALTER TABLE general.location ADD CONSTRAINT fk_location_worker_id FOREIGN KEY (worker_id) references general.workers(id);

ALTER TABLE general.location ADD CONSTRAINT fk_location_state_id FOREIGN KEY (state_id) references states(id);

ALTER TABLE general.location ADD CONSTRAINT fk_location_municipality_id FOREIGN KEY (municipality_id) references municipalities(id);

ALTER TABLE general.location ADD CONSTRAINT fk_location_parish_id FOREIGN KEY (parish_id) references parishes(id);

CREATE VIEW general.view_location AS SELECT l.*, s.state, m.municipality, p.parish FROM general.location AS l
LEFT JOIN states AS s ON l.state_id = s.id
LEFT JOIN municipalities AS m ON l.municipality_id = m.id 
LEFT JOIN parishes AS p ON l.parish_id = p.id;

CREATE VIEW general.view_workers AS SELECT w.*, g.gender, d.department, p.position, l.state_id, l.state, l.municipality_id, l.municipality, l.parish_id, l.parish, l.address FROM general.workers AS w
LEFT JOIN genders AS g ON g.id = w.gender_id
LEFT JOIN general.view_location AS l ON w.id = l.worker_id
LEFT JOIN general.department AS d ON d.id = w.department_id
LEFT JOIN general.position AS p ON p.id = w.position_id;