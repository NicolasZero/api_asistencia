-- This is test data for testing the database

-- Positions
-- INSERT INTO general.position OVERRIDING SYSTEM VALUE VALUES (1,'Programador');

-- Departments
--INSERT INTO general.department OVERRIDING SYSTEM VALUE VALUES (1,'Sistemas');

-- Roles
INSERT INTO attendance_control.roles OVERRIDING SYSTEM VALUE VALUES (1, 'admin');

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
INSERT INTO attendance_control.users OVERRIDING SYSTEM VALUE VALUES (1,1, 'admin', '$2a$10$z/N3ZdEEs6K7az5lQvVGMeDMCGcDadI4q5NGVJgzQv91RJF0I2o96', 1);
INSERT INTO attendance_control.users OVERRIDING SYSTEM VALUE VALUES (2,2, 'user', '$2a$10$i58qxOuHz79jo8aV33UknODoQra1itufnLwIS3.tsD098Ke8OQowG', 2);
-- admin password admin
-- user password user

-- Attendances
-- INSERT INTO attendance_control.attendance OVERRIDING SYSTEM VALUE VALUES
-- (1, 1, '2024-08-07', '15:06:51.517465', '15:17:15.602355'),
-- (2, 1, '2024-08-08', '09:00:24.252248', '15:10:10.602355'),
-- (3, 1, '2024-08-09', '09:01:24.252248', '15:15:14.602355'),
-- (4, 1, '2024-08-10', '09:06:24.252248', '15:20:18.602355'),
-- (5, 1, '2024-08-11', '09:16:24.252248', NULL),
-- (6, 2, '2024-08-21', '09:06:51.517465', '15:17:15.602355'),
-- (7, 2, '2024-08-07', '15:06:51.517465', '15:17:15.602355'),
-- (8, 2, '2024-08-08', '09:00:24.252248', '15:10:10.602355'),
-- (9, 2, '2024-08-09', '09:01:24.252248', '15:15:14.602355'),
-- (10, 3, '2024-08-10', '09:06:24.252248', '15:20:18.602355'),
-- (11, 4, '2024-08-11', '09:16:24.252248', NULL),
-- (12, 3, '2024-08-21', '09:06:51.517465', '15:17:15.602355');


--SELECT pg_catalog.setval('general.position_id_seq', 2, true);
--SELECT pg_catalog.setval('general.department_id_seq', 2, true);
SELECT pg_catalog.setval('general.workers_id_seq', 11, true);
-- SELECT pg_catalog.setval('attendance_control.attendance_id_seq', 13, true);
SELECT pg_catalog.setval('attendance_control.roles_id_seq', 2, true);
SELECT pg_catalog.setval('attendance_control.users_id_seq', 3, true);