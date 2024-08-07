const { query } = require('../db/postgresql')

const getAllAttendances = async (request, reply) => {
    try {
        const date = new Date()
        const year = date.getFullYear()
        // const month = date.getMonth() + 1  
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const dateYMD = `${year}-${month}-${day}`
        // date.toLocaleDateString()
        // const dateFormat = date.toJSON().slice(0,10)


        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE")
        // reply.send({ data: date.toLocaleDateString('en-US', { timeZone: 'America/New_York' }) })
        reply.send({ data: resp.row })

    } catch (error) {
        reply.send({ error: 'error' })
        console.log(error)
    }
}

const getAttendance = async (request, reply) => {
    try {
        const { id } = request.params

        // reply.send({ data: 'a user data' })
        // reply.send({data:`user data of id: ${id}`})
        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND worker_id = $1", [id])
        reply.send({ data: resp.row })
    } catch (error) {
        reply.send({ error: 'error' })
        console.log(error)
    }
}

const checkIn = async (request, reply) => {
    try {
        const { id } = request.body

        if (typeof id !== "number") {
            return reply.send({ error: 'body not valid' })
        }

        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND worker_id = $1", [id])

        if (resp.rows.length == 0) {
            const resp2 = await query("INSERT INTO attendance_control.attendance (worker_id) VALUES ($1)", [id])
            if (resp2.rowCount == 1) {
                return reply.send({ data: "registrado" })
            }
        }

        reply.send({ error: "ya registro hora de salida" })
    } catch (error) {
        reply.send({ error: 'error' })
        console.log(error)
    }
}

const checkOut = async (request, reply) => {
    try {
        const { id } = request.body

        if (typeof id !== "number") {
            return reply.send({ error: 'body not valid' })
        }

        const resp = await query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND check_out is null AND worker_id = $1", [id])

        if (resp.rows.length == 0) {
            return reply.send({ error: "ya registro hora de salida" })
        }
        
        const resp2 = await query("UPDATE attendance_control.attendance SET check_out = CURRENT_TIME WHERE date_attendance = CURRENT_DATE AND worker_id = $1", [id])
        if (resp2.rowCount == 1) {
            return reply.send({ data: "Actualizado" })
        }
    } catch (error) {
        reply.send({ error: 'error' })
        console.log(error)
    }
}

module.exports = {
    getAllAttendances,
    getAttendance,
    checkIn,
    checkOut
}