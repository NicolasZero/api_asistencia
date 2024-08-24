const { getAttendancesToday,getAllAttendances, checkIn, checkOut, getAttendanceByFilter } = require("../controllers/controller.attend");

const routes = [
  {
    method: "GET",
    url: "/attendance",
    handler: getAttendancesToday,
  },
  {
    method: "GET",
    url: "/attendance/pag/:page/lim/:limit",
    // url example:  /attendance/pag/1/lim/10
    handler: getAllAttendances,
  },
  {
    method: "POST",
    url: "/attendance/filter/pag/:page/lim/:limit",
    // body: { date_end:string, date_start:string, department:number, ic:number }
    handler: getAttendanceByFilter,
  },
  {
    method: "POST",
    url: "/attendance",
    handler: checkIn
    // body: {id: number}
  },
  {
    method: "PATCH",
    url: "/attendance",
    handler: checkOut,
    // body: {id: number}
  }
];

module.exports = routes;
