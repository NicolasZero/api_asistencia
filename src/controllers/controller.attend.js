const { query } = require("../db/postgresql");

// const date = new Date()
// const year = date.getFullYear()
// const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
// const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
// const dateYMD = `${year}-${month}-${day}`
// console.log(dateYMD)

const getAllAttendances = async (request, reply) => {
    try {
        const resp = await query("SELECT * FROM attendance_control.view_attendance WHERE date_attendance = CURRENT_DATE")
        reply.send({ data: resp.rows, status: "ok"});
    } catch (error) {
        reply.code(409).send({ error: "error", status:"failed"});
        console.log(error);
    }
};

// const getAttendance = async (request, reply) => {
//     try {
//         const { id } = request.params;
//         const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND worker_id = $1",[id])
//         reply.send({ data: resp.rows, status: "ok"});
//     } catch (error) {
//         reply.code(409).send({ error: "error", status:"failed" });
//         console.log(error);
//     }
// };

const getAttendanceByFilter = async (request, reply) => {
    try {
        // const { id } = request.params
        let { date_end, date_start, department, ic } = request.body

        // Request body verification
        if (
            (typeof department !== "number" && typeof department !== "undefined") ||
            (typeof ic !== "number" && typeof ic !== "undefined")
        ) {
            console.log(typeof department)
            console.log(typeof ic)
            return reply.code(400).send({ error: "body not valid", status:"failed" })
        }

        // Guarda en una variable el query, para editarlo segun los filtros
        let textQuery = "SELECT * FROM attendance_control.view_attendance WHERE true"
        let valueQuery = []
        let num = 1

        // filter by date
        if (date_end && date_start) {
            if (new Date(date_end) > new Date(date_start)) {
                return reply.code(400).send({ error: "Rango de fecha no valido", status:"failed" })
            }
            textQuery += " AND date_attendance BETWEEN $1 AND $2"
            valueQuery.push(date_end, date_start)
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
        reply.code(409).send({ error: "error", status:"failed" })
        console.log(error)
    }
};

const checkIn = async (request, reply) => {
    try {
        const { id } = request.body

        // verifica que el request body sea valido
        if (typeof id !== "number") {
            return reply.code(400).send({ error: "body not valid", status:"failed"})
        }

        // Busca si existe un registro de asistencia del dia de hoy de ese trabajador
        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND worker_id = $1",[id])
        
        // Si no existe, registra la asistencia
        if (resp.rows.length == 0) {
            const resp2 = await query("INSERT INTO attendance_control.attendance (worker_id) VALUES ($1)",[id])
            if (resp2.rowCount == 1) {
                return reply.code(201).send({data:"registrado",status:"ok"})
            }
        }

        return reply.code(400).send({error:"Ese trabajador ya registro su hora de entrada del dia de hoy", status:"failed"});
    } catch (error) {
        reply.code(409).send({ error: "error",status:"failed" });
        console.log(error)
    }
};

const checkOut = async (request, reply) => {
    try {
        const { id } = request.body

        // verifica que el request body sea valido
        if (typeof id !== "number") {
            return reply.code(400).send({ error: "body not valid", status:"failed"});
        }

        // Busca si existe un registro de asistencia del dia de hoy de ese trabajador
        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND check_out is null AND worker_id = $1",[id])

        // Si no existe, termina el proceso
        if (resp.rows.length == 0) {
            return reply.code(400).send({ error: "Ese trabajador ya registro su hora de salida del dia de hoy", status:"failed" });
        }

        // actualiza el campo de salida del registro de asistencia
        const resp2 = await query("UPDATE attendance_control.attendance SET check_out = CURRENT_TIME WHERE date_attendance = CURRENT_DATE AND worker_id = $1",[id])
        if (resp2.rowCount == 1) {
            return reply.code(204).send({ data: "Actualizado", status:"ok" });
        }
    } catch (error) {
        reply.code(409).send({ error: "error", status:"failed" })
        console.log(error)
    }
}

module.exports = {
    getAllAttendances,
    checkIn,
    checkOut,
    getAttendanceByFilter,
}