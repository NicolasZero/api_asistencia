const user = require('./route.user')
const login = require('./route.login')
const assist = require('./route.assist')

// const routes = [].concat(user,login,assist)
const routes = [login,user,assist].flat()
module.exports = routes