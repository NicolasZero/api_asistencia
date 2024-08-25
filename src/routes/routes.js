const user = require('./route.user')
const login = require('./route.auth')
const assist = require('./route.attendance')
const worker = require('./route.worker')

// const routes = [].concat(user,login,assist)
const routes = [login,user,assist,worker].flat()
module.exports = routes