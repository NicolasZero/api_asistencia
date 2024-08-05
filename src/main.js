const fastify = require("fastify")({ logger: true });
const { verification } = require("./db/postgresql");
const routeLicense = require("./routes/routes.js");

// Database connection verification
verification()

// Wellcome route
fastify.get("/", (request, reply) => {
  reply.send({ msg: "Wellcome" });
});

routeLicense.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    // Start the server on port 3000, listening on all network interfaces
    await fastify.listen({ port: 3000, host: "localhost" });
    // Log a message to indicate that the API is online
    console.log(`Api en linea`);
  } catch (err) {
    // Log any error that occurs during server startup and exit the process
    fastify.log.error(err);
    process.exit(1);
  }
};
start();