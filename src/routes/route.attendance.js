const { getAllAttendances, checkIn, checkOut, getAttendanceByFilter } = require("../controllers/controller.attend");

const routes = [
  {
    method: "GET",
    url: "/attendance",
    handler: getAllAttendances,
  },
  {
    method: "POST",
    url: "/attendance/filter",
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
