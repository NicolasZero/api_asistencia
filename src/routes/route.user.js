// const {} = require('../controllers/controller.user')

module.exports = async function (fastify) {
    fastify.get('/', (req, reply) => {
        reply.send({ message: '/ route user' })
    })
    fastify.post('/register', () => { })
    fastify.post('/login', () => { })
    fastify.delete('/logout', () => { })
}