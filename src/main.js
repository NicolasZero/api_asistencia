const fastify = require("fastify")({ logger: false });
const { verification } = require("./db/postgresql");
const cors = require('@fastify/cors')

fastify.register(cors, {
  // put your options here
})

// Database connection verification
verification()

// Wellcome route
fastify.get("/", (request, reply) => {
  reply.send({ msg: "Wellcome" });
});

// Nombre de las rutas
const routeName = ['auth','user','attendance','worker']

routeName.forEach((route) => {
  fastify.register(require(`./routes/route.${route}.js`), { prefix: `${route}` })
})

// const listeners = ['SIGINT', 'SIGTERM']
// listeners.forEach((signal) => {
//   process.on(signal, async () => {
//     await fastify.close()
//     process.exit(0)
//   })
// })

const start = async () => {
  try {
    // Start the server on port 3000, listening on all network interfaces
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    // Log a message to indicate that the API is online
    console.log(`API running on the port 3000`);
  } catch (err) {
    // Log any error that occurs during server startup and exit the process
    fastify.log.error(err);
    process.exit(1);
  }
};

start();