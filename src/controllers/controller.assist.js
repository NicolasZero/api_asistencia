// const { query } = require('../db/postgresql')

const getAllAssist = async (request, reply) => {
    try {
        reply.send({ data: 'all user assist' })
    } catch (error) {
        reply.send({error:'error'})
        console.log(error)
    }
}

const getAssist = async (request, reply) => {
    try {
        
        reply.send({ data: 'a user data' })
    } catch (error) {
        reply.send({error:'error'})
        console.log(error)
    }
}

module.exports = {
    getAllAssist,
    getAssist
}