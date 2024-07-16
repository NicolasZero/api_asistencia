const user = require('./route.user')
const login = require('./route.auth')
const assist = require('./route.attend')

// const routes = [].concat(user,login,assist)
const routes = [login,user,assist].flat()
module.exports = routes