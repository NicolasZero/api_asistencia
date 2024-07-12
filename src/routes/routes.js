const user = require('./route.user')
const login = require('./route.login')

const routes = [login,user].flat()
module.exports = routes