const { getAllAttendances, getAttendance, checkIn, checkOut } = require("../controllers/controller.attend");

const routes = [
  {
    method: "GET",
    url: "/attendance",
    handler: getAllAttendances,
  },
  {
    method: "GET",
    url: "/attendance/:id",
    handler: getAttendance,
  },
  {
    method: "POST",
    url: "/attendance",
    handler: checkIn
    // body: id
  },
  {
    method: "PATCH",
    url: "/attendance",
    handler: checkOut,
    // body: id
  }
];

module.exports = routes;
