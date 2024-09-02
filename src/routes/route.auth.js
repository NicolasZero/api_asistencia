const controller = require('../controllers/controller.auth')

module.exports = async function (fastify) {
    fastify.get('/', (req, reply) => {
        reply.send({ message: '/ route auth' })
    })
    
    // Para encriptar el password / solo para pruebas
    fastify.post('/encrypt', controller.register)

    // body: { username:string, password:string }
    fastify.post('/login', controller.authUser)

    fastify.delete('/logout', () => { })
}