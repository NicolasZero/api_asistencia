-- Create tables with public data (No data is inserted)

-- CREATE TABLE ethnicity(
--     id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
--     ethnicity varchar NOT NULL UNIQUE
-- );

CREATE TABLE IF NOT EXISTS genders(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
    gender varchar NOT NULL UNIQUE
);

-- CREATE TABLE civil_status(
--     id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1),
--     civil_status varchar NOT NULL
-- );

CREATE TABLE IF NOT EXISTS states(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1 MAXVALUE 24),
    state varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS municipalities(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1 MAXVALUE 335),
    state_id integer NOT NULL,
    municipality varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS parishes(
    id integer NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY (START WITH 1 MAXVALUE 1134),
    municipality_id integer NOT NULL,
    parish varchar NOT NULL
);