-- This is test data for testing the database
INSERT INTO general.position(position) VALUES ('Programador');
INSERT INTO general.department(department) VALUES ('Sistemas');
INSERT INTO general.workers (identity_card, is_foreign, names, last_names, gender_id, department_id, position_id) VALUES (28076011, false, 'Nicolas', 'Zapata', 2, 1, 1);