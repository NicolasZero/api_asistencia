const controller = require('../controllers/controller.auth')

module.exports = async function (fastify) {
    fastify.get('/', (req, reply) => {
        reply.send({ message: '/ route auth' })
    })
    
    // fastify.post('/encrypt', controller.register)
    
    // Para encriptar el password del usuario
    fastify.get('/password/:password', controller.password)


    // body: { username:string, password:string }
    fastify.post('/login', controller.authUser)

    // fastify.delete('/logout', () => { })
}