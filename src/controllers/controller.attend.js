const { query } = require("../db/postgresql");

// const date = new Date()
// const year = date.getFullYear()
// const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
// const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
// const dateYMD = `${year}-${month}-${day}`
// console.log(dateYMD)

const getAttendancebyWorker = async (request, reply) => {
    try {
        const {value} = request.params
        // verifica que el request body sea valido
        if (!Number(value)) {
            return reply.code(400).send({ error: "params not valid", status: "failed" });
        }
        const resp = await query("SELECT * FROM attendance_control.view_attendance WHERE date_attendance = current_date AND identity_card = $1",[value])
        
        // En caso de no encontrar resultados manda los datos del trabajador

        // "id": 1,
        //     "worker_id": 1,
        //     "date_attendance": "2024-08-07T04:00:00.000Z",
        //     "check_in": "15:06:51.517465",
        //     "check_out": "15:17:15.602355",
        //     "date_attendance_string": "07/08/2024",
        //     "check_in_string": "15:06",
        //     "check_out_string": "15:17",
        //     "identity_card": 28076011,
        //     "full_name": "Nicolas Zapata",
        //     "status": "true",
        //     "gender": "Hombre",
        //     "gender_id": 2,
        //     "department": "OFICINA DE SISTEMAS Y TECNOLOGIA DE LA INFORMACION",
        //     "department_id": 14

        if (resp.rowCount == 0) {
            const textQuery = "SELECT 0 as id, null as date_attendance, id as worker_id, identity_card, full_name, status, gender, gender_id, department, department_id, position, position_id FROM general.view_workers WHERE identity_card = $1"
            const resp = await query(textQuery,[value])    
            return reply.send({ data: resp.rows, status: "ok" });
        }

        return reply.send({ data: resp.rows, status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
}

const getAttendancesToday = async (request, reply) => {
    try {
        const resp = await query("SELECT * FROM attendance_control.view_attendance WHERE date_attendance = current_date")
        return reply.send({ data: resp.rows, status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
}

const getAllAttendances = async (request, reply) => {
    try {
        const { page, limit } = request.params

        // verifica que el request params sea valido
        if (!Number(page) || !Number(limit) || limit > 1000  || limit < 1) {
            return reply.code(400).send({ error: "params not valid", status: "failed" });
        }

        // calcula desde cual registro empezara a mostrar los resultados
        const offset = (page - 1) * limit

        const textQuery = `SELECT * FROM attendance_control.view_attendance LIMIT ${limit} OFFSET ${offset}`
        const resp = await query(textQuery)
        return reply.send({ data: resp.rows, status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
};

const getAttendanceByFilter = async (request, reply) => {
    try {
        const { page, limit } = request.params
        const { date_end, date_start, department, ic } = request.body

        // verifica que el request params sea valido
        if (!Number(page) || !Number(limit) || limit > 1000  || limit < 1) {
            return reply.code(400).send({ error: "params not valid", status: "failed" });
        }

        // Request body verification
        if (
            (typeof department !== "number" && typeof department !== "undefined") ||
            (typeof ic !== "number" && typeof ic !== "undefined")
        ) {
            return reply.code(400).send({ error: "body not valid", status: "failed" })
        }

        // calcula desde cual registro empezara a mostrar los resultados
        const offset = (page - 1) * limit

        // Guarda en una variable el query, los valores y el numero de variables para editarlo según los filtros especificados
        let textQuery = "SELECT * FROM attendance_control.view_attendance WHERE true"
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

        textQuery += ` LIMIT ${limit} OFFSET ${offset}`

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
            "(select date_attendance from attendance_control.attendance where date_attendance = current_date and worker_id = $1) RETURNING TO_CHAR(check_in,'HH24:MI AM') as check_in_string" 

        const resp = await query(queryText, [id])

        if (resp.rowCount != 1) {
            return reply.code(409).send({ error: "Ese trabajador ya registro su hora de entrada del dia de hoy", status: "failed" });
        }

        return reply.code(201).send({ data: resp.rows[0], status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error)
    }
}

const checkOut = async (request, reply) => {
    try {
        const { id } = request.body
        // verifica que el request body sea valido
        if (typeof id !== "number") {
            return reply.code(400).send({ error: "body not valid", status: "failed" });
        }

        // actualiza el campo de salida del registro de asistencia del trabajador si está en null y si es del dia de hoy
        const queryText = "UPDATE attendance_control.attendance SET check_out = CURRENT_TIME WHERE date_attendance = CURRENT_DATE AND check_out is null AND worker_id = $1 RETURNING TO_CHAR(check_out,'HH24:MI AM') as check_out_string"
        const resp = await query(queryText, [id])
        if (resp.rowCount != 1) {
            return reply.code(409).send({ error: "Ese trabajador ya registro su hora de salida del dia de hoy", status: "failed" });
        }

        return reply.code(201).send({ data: resp.rows[0], status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" })
        console.log(error)
    }
}

module.exports = {
    getAttendancesToday,
    getAllAttendances,
    checkIn,
    checkOut,
    getAttendanceByFilter,
    getAttendancebyWorker
}