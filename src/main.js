const fastify = require("fastify")({ logger: false });
const fs = require('fs')
const { verification } = require("./db/postgresql");
const cors = require('@fastify/cors')

fastify.register(cors, {
  origin: '*'
})

// Database connection verification
verification()

// Wellcome route
fastify.get("/", (request, reply) => {
  reply.send({ msg: "Wellcome" });
});

// Nombre de las rutas
// const routeName = ['auth','user','attendance','worker']

// routeName.forEach((route) => {
//   fastify.register(require(`./routes/route.${route}.js`), { prefix: `${route}` })
// })

// Obtiene la dirección de la carpeta de rutas
const pathRouter = `${__dirname}/routes`

// Genera automaticamente los prefijos para las rutas
fs.readdirSync(pathRouter).filter((file)=>{
    const route = file.substring(0, file.length - 3)
    fastify.register(require(`./routes/${route}.js`), { prefix: route })    
    // console.log('--->',route)
})

const start = async () => {
  const { PORT = 3000, HOST = "0.0.0.0" } = process.env;
  try {
    // Start the server on port 3000, listening on all network interfaces
    await fastify.listen({ port: PORT, host: HOST });
    // Log a message to indicate that the API is online
    console.log(`API running on the port ${PORT} and host ${HOST}`);
  } catch (err) {
    // Log any error that occurs during server startup and exit the process
    fastify.log.error(err);
    process.exit(1);
  }
};

start();