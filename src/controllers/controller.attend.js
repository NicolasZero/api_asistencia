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

        
        const resp = query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE")
        // reply.send({ data: date.toLocaleDateString('en-US', { timeZone: 'America/New_York' }) })
        reply.send({ data: resp.row })

    } catch (error) {
        reply.send({error:'error'})
        console.log(error)
    }
}

const getAttendance = async (request, reply) => {
    try {
        const {id} = request.params
        
        // reply.send({ data: 'a user data' })
        // reply.send({data:`user data of id: ${id}`})
        const resp = query("SELECT * FROM attendance_control.attendance WHERE date_attendance = CURRENT_DATE AND id_worker = $1", [id])
        reply.send({ data: resp.row })
    } catch (error) {
        reply.send({error:'error'})
        console.log(error)
    }
}

const postAttendances = async (request, reply) => {
    try {
        const {id} = request.body
        
        reply.send({ data: resp.row })
    } catch (error) {
        reply.send({error:'error'})
        console.log(error)
    }
}

module.exports = {
    getAllAttendances,
    getAttendance
}