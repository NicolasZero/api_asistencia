const controller = require("../controllers/controller.attend");

module.exports = async function (fastify) {
  // Consulta de las asistencias de todos los trabajadores del dia de hoy
  fastify.get("/", controller.getAttendancesToday);
  
  // Consulta de las asistencias del trabajador (por cedula) especificado del dia de hoy
  fastify.get("/:value", controller.getAttendancebyWorker);

  // Consulta de todas las asistencias (utiliza paginacion)
  // url example:  /attendance/pag/1/lim/10
  fastify.get("/pag/:page/lim/:limit", controller.getAllAttendances);

  // Consulta de todas las asistencias con filtros (utiliza paginacion)
  // body: { ?date_end:string, ?date_start:string, ?department:number, ?ic:number }
  // ? = Opcional, no agregar el signo de interrogacion
  fastify.get("/filter/pag/:page/lim/:limit", controller.getAttendanceByFilter);

  // Registra la hora de entrada
  // body: {id: number}
  fastify.post("/", controller.checkIn);

  // Registra la hora de salida
  // body: {id: number}
  fastify.patch("/", controller.checkOut);
}