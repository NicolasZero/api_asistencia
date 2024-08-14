const { getAllAttendances, getAttendance, checkIn, checkOut } = require("../controllers/controller.attend");

const routes = [
  {
    method: "GET",
    url: "/attendance",
    //body: {option: 'all', 'day', 'month', ''}
    handler: getAllAttendances,
  },
  {
    method: "GET",
    url: "/attendance/worker/:id",
    handler: getAttendance,
  },
  {
    method: "GET",
    url: "/attendance/department/:id",
    handler: getAttendance,
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
    // body: id
  }
];

module.exports = routes;
