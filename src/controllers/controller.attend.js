const { query } = require("../db/postgresql");

// const date = new Date()
// const year = date.getFullYear()
// const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
// const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
// const dateYMD = `${year}-${month}-${day}`
// console.log(dateYMD)

const getAllAttendances = async (request, reply) => {
    try {
        const textQuery = "SELECT id, worker_id, TO_CHAR(date_attendance, 'dd/mm/yyyy') as date_attendance, TO_CHAR(check_in,'HH24:MI') as check_in, TO_CHAR(check_out,'HH24:MI') as check_out,identity_card,full_name,status,gender,gender_id,department,department_id FROM attendance_control.view_attendance WHERE date_attendance = CURRENT_DATE";
        const resp = await query(textQuery)
        reply.send({ data: resp.rows, status: "ok" });
        console.log(resp.rows);
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
};

const getAttendanceByFilter = async (request, reply) => {
    try {
        // const { id } = request.params
        let { date_end, date_start, department, ic } = request.body

        // Request body verification
        if (
            (typeof department !== "number" && typeof department !== "undefined") ||
            (typeof ic !== "number" && typeof ic !== "undefined")
        ) {
            // console.log(typeof department)
            // console.log(typeof ic)
            return reply.code(400).send({ error: "body not valid", status: "failed" })
        }

        // Guarda en una variable el query, para editarlo segun los filtros
        let textQuery = "SELECT id, worker_id, TO_CHAR(date_attendance, 'dd/mm/yyyy') as date_attendance, TO_CHAR(check_in,'HH24:MI') as check_in, TO_CHAR(check_out,'HH24:MI') as check_out,identity_card,full_name,status,gender,gender_id,department,department_id FROM attendance_control.view_attendance WHERE true"
        let valueQuery = []
        let num = 1

        // filter by date
        if (date_end && date_start) {
            if (new Date(date_end) < new Date(date_start)) {
                return reply.code(400).send({ error: "Rango de fecha no valido", status: "failed" })
            }
            textQuery += " AND date_attendance BETWEEN $1 AND $2"
            valueQuery.push(date_start, date_end)
            num = 3
        }

        // filter by department
        if (department) {
            textQuery += ` AND department_id = $${num}`
            valueQuery.push(department)
            num += 1
        }

        // filter by worker
        if (ic) {
            textQuery += ` AND identity_card = $${num}`
            valueQuery.push(ic)
        }

        const resp = await query(textQuery, valueQuery)
        return reply.send({ data: resp.rows, status: "ok" })

    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" })
        console.log(error)
    }
};

const checkIn = async (request, reply) => {
    try {
        const { id } = request.body

        // verifica que el request body sea valido
        if (typeof id !== "number") {
            return reply.code(400).send({ error: "body not valid", status: "failed" });
        }

        // SQL que inserta la asistenca solo si no está ya registrada el dia de hoy
        const queryText = "INSERT INTO attendance_control.attendance (worker_id, date_attendance, check_in)" +
            "SELECT $1, current_date, current_time WHERE NOT EXISTS" +
            "(select date_attendance from attendance_control.attendance where date_attendance = current_date and worker_id = $1)"
        
        const resp = await query(queryText,[id])
        console.log(resp)
        
        if (resp.rowCount != 1) {
            return reply.code(409).send({ error: "Ese trabajador ya registro su hora de entrada del dia de hoy", status: "failed" });
        }

        return reply.code(201).send({ data: "registrado", status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error)
    }
}

const checkOut = async (request, reply) => {
    try {
        const {id} = request.body
        // verifica que el request body sea valido
        if (typeof id !== "number") {
            return reply.code(400).send({ error: "body not valid", status: "failed" });
        }

        // actualiza el campo de salida del registro de asistencia del trabajador si está en null y si es del dia de hoy
        const queryText ="UPDATE attendance_control.attendance SET check_out = CURRENT_TIME WHERE date_attendance = CURRENT_DATE AND check_out is null AND worker_id = $1"
        const resp = await query(queryText,[id])
        if (resp.rowCount != 1) {
            return reply.code(409).send({ error: "Ese trabajador ya registro su hora de salida del dia de hoy", status: "failed" });
        }

        return reply.code(201).send({ data: "Actualizado", status: "ok" });
    } catch (error) {
        reply.code(409).send({error: "error", status: "failed"})
    }
}

module.exports = {
    getAllAttendances,
    checkIn,
    checkOut,
    getAttendanceByFilter,
}