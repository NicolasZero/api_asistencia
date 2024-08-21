const { getAllAttendances, getAttendance, checkIn, checkOut, getAttendanceByFilter } = require("../controllers/controller.attend");

const routes = [
  {
    method: "GET",
    url: "/attendance",
    handler: getAllAttendances,
  },
  {
    method: "POST",
    url: "/attendance/filter",
    // { date_end:string, date_start:string, department:number, ic:number } body
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
