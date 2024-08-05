const { getAllAttendances, getAttendance } = require("../controllers/controller.attend");

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
    handler: getAttendance,
  }
];

module.exports = routes;
