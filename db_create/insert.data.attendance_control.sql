-- Roles
INSERT INTO attendance_control.roles OVERRIDING SYSTEM VALUE VALUES
(0, 'NINGUNO'),
(1, 'Administrador(a)'),
(2, 'Usuario(a)');

SELECT pg_catalog.setval('attendance_control.roles_id_seq', 2, true);