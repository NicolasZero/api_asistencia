-- This is test data for testing the database

-- Positions
INSERT INTO general.position OVERRIDING SYSTEM VALUE VALUES (1,'Programador');

-- Departments
--INSERT INTO general.department OVERRIDING SYSTEM VALUE VALUES (1,'Sistemas');

-- Workers
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (1,28076011, false, 'Nicolas Zapata', 2, 14, 1);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (2,28076010, false, 'Jose Perez', 2, 1, 1);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (3,28076009, false, 'Maria Luna', 1, 2, 1);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (4,28076008, false, 'Sofia pacheco', 1, 3, 1);
INSERT INTO general.workers OVERRIDING SYSTEM VALUE VALUES (5,28076008, false, 'Karen Ramirez', 1, 3, 1);

-- Attendances
INSERT INTO attendance_control.attendance OVERRIDING SYSTEM VALUE VALUES
(1, 1, '2024-08-07', '15:06:51.517465', '15:17:15.602355'),
(2, 1, '2024-08-08', '09:00:24.252248', '15:10:10.602355'),
(3, 1, '2024-08-09', '09:01:24.252248', '15:15:14.602355'),
(4, 1, '2024-08-10', '09:06:24.252248', '15:20:18.602355'),
(5, 1, '2024-08-11', '09:16:24.252248', NULL),
(6, 2, '2024-08-21', '09:06:51.517465', '15:17:15.602355'),
(7, 2, '2024-08-07', '15:06:51.517465', '15:17:15.602355'),
(8, 2, '2024-08-08', '09:00:24.252248', '15:10:10.602355'),
(9, 2, '2024-08-09', '09:01:24.252248', '15:15:14.602355'),
(10, 3, '2024-08-10', '09:06:24.252248', '15:20:18.602355'),
(11, 4, '2024-08-11', '09:16:24.252248', NULL),
(12, 3, '2024-08-21', '09:06:51.517465', '15:17:15.602355');


SELECT pg_catalog.setval('general.position_id_seq', 2, true);
--SELECT pg_catalog.setval('general.department_id_seq', 2, true);
SELECT pg_catalog.setval('general.workers_id_seq', 6, true);
SELECT pg_catalog.setval('attendance_control.attendance_id_seq', 13, true);