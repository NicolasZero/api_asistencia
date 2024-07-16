const {authUser} = require('../controllers/controller.auth')

const routes = [{
    method: 'POST',
    url: '/login',
    handler: authUser
}]
module.exports = routes