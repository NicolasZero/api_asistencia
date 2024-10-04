-- This is test data for testing the database

-- Workers
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (1,28076011, false, 'Nicolas Zapata', 2, 14, 73,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (2,28076010, false, 'Jose Perez', 2, 2, 4,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (3,28076009, false, 'Maria Luna', 1, 7, 1,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (4,28076008, false, 'Sofia pacheco', 1, 7, 1,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (5,28076007, false, 'Karen Ramirez', 1, 7, 1,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (6,27451286, false, 'Anthony Ruiz', 2, 14, 73,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (7,28076005, false, 'Jose Ramirez', 2, 2, 9,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (8,28076004, false, 'isaac Lopez', 2, 11, 7,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (9,28076003, false, 'Marta Landaeta', 1, 13, 28,4);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (10,28076002, false, 'Gloria Betancurt', 1, 4, 67,4);

-- Users
INSERT INTO attendance_control.users OVERRIDING SYSTEM VALUE VALUES 
(1, 1, 'admin', '$2a$10$z/N3ZdEEs6K7az5lQvVGMeDMCGcDadI4q5NGVJgzQv91RJF0I2o96', 1),
(2, 2, 'user', '$2a$10$i58qxOuHz79jo8aV33UknODoQra1itufnLwIS3.tsD098Ke8OQowG', 2);
-- admin password admin
-- user password user

SELECT pg_catalog.setval('general.workers_id_seq', 11, true);
SELECT pg_catalog.setval('attendance_control.users_id_seq', 3, true);