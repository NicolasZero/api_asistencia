const { getAttendancesToday,getAllAttendances,checkIn,checkOut,getAttendanceByFilter,getAttendancebyWorker} = require("../controllers/controller.attend");

const routes = [
  // Consulta de las asistencias del trabajador (por cedula) especificado del dia de hoy
  {
    method: "GET",
    url: "/attendance/:value",
    handler: getAttendancebyWorker,
  },
  // Consulta de las asistencias de todos los trabajadores del dia de hoy
  {
    method: "GET",
    url: "/attendance",
    handler: getAttendancesToday,
  },
  // Consulta de todas las asistencias (utiliza paginacion)
  {
    method: "GET",
    url: "/attendance/pag/:page/lim/:limit",
    // url example:  /attendance/pag/1/lim/10
    handler: getAllAttendances,
  },
  // Consulta de todas las asistencias con filtros (utiliza paginacion)
  {
    method: "POST",
    url: "/attendance/filter/pag/:page/lim/:limit",
    // body: { date_end:string, date_start:string, department:number, ic:number }
    handler: getAttendanceByFilter,
  },
  // Registra la hora de entrada
  {
    method: "POST",
    url: "/attendance",
    handler: checkIn
    // body: {id: number}
  },
  // Registra la hora de salida
  {
    method: "PATCH",
    url: "/attendance",
    handler: checkOut,
    // body: {id: number}
  }
];

module.exports = routes;
