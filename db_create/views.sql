-- Public
CREATE OR REPLACE VIEW view_location AS SELECT m.state_id, s.state, p.municipality_id, m.municipality, p.id AS parish_id, p.parish FROM parishes AS p
LEFT JOIN municipalities AS m ON p.municipality_id = m.id 
LEFT JOIN states AS s ON m.state_id = s.id;

-- general
CREATE OR REPLACE VIEW general.view_location_workers AS SELECT l.*, v.state, v.municipality, v.parish FROM general.location AS l
LEFT JOIN view_location AS v ON l.parish_id = v.parish_id;

-- CREATE OR REPLACE VIEW general.view_workers AS SELECT w.*, g.gender, d.department, p.position, l.state_id, l.state, l.municipality_id, l.municipality, l.parish_id, l.parish, l.address FROM general.workers AS w
-- LEFT JOIN genders AS g ON g.id = w.gender_id
-- LEFT JOIN general.view_location_workers AS l ON w.id = l.worker_id
-- LEFT JOIN general.department AS d ON d.id = w.department_id
-- LEFT JOIN general.position AS p ON p.id = w.position_id;

CREATE OR REPLACE VIEW general.view_workers AS SELECT w.*, g.gender, d.department, p.position, t.name AS payroll_type, a.area, l.state_id, l.state, l.municipality_id, l.municipality, l.parish_id, l.parish, l.address FROM general.workers AS w
LEFT JOIN genders AS g ON g.id = w.gender_id
LEFT JOIN general.view_location_workers AS l ON w.id = l.worker_id
LEFT JOIN general.department AS d ON d.id = w.department_id
LEFT JOIN general.position AS p ON p.id = w.position_id
LEFT JOIN general.payroll_type AS t ON t.id = w.payroll_type_id
lEFT JOIN general.area_coordination AS a ON a.id = w.area_coordination_id;

-- attendance_control
CREATE OR REPLACE VIEW attendance_control.view_attendance AS SELECT a.*, TO_CHAR(a.date_attendance, 'dd/mm/yyyy') as date_attendance_string, TO_CHAR(a.check_in,'HH24:MI AM') as check_in_string, TO_CHAR(a.check_out,'HH24:MI AM') as check_out_string, w.identity_card, w.full_name, w.status, w.gender, w.position, w.position_id, w.gender_id, w.department, w.department_id
FROM attendance_control.attendance as a
LEFT JOIN general.view_workers as w ON w.id = a.worker_id
ORDER BY a.date_attendance DESC;

CREATE OR REPLACE VIEW attendance_control.view_users AS SELECT u.*, r.role, w.identity_card, w.full_name, w.status, w.gender, w.position, w.position_id, w.gender_id, w.department, w.department_id FROM attendance_control.users AS u
LEFT JOIN attendance_control.roles AS r ON r.id = u.role_id
LEFT JOIN general.view_workers AS w ON w.id = u.worker_id;