const fastify = require('fastify')(
    {logger: true}
)

const routeLicense = require('./routes/routes.js')

// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({ msg:'Wellcome'})
})

routeLicense.forEach(route => {
    fastify.route(route)
})

// console.log(routeLicense)

const start = async () => {
    try {
        // Start the server on port 3000, listening on all network interfaces
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        // Log a message to indicate that the API is online
        console.log(`Api en linea`)
    } catch (err) {
        // Log any error that occurs during server startup and exit the process
        fastify.log.error(err)
        process.exit(1)
    }
}

start()