const {getAllAttend, getAttend} = require('../controllers/controller.attend')

const routes = [{
    method: 'GET',
    url: '/attend',
    handler: getAllAttend
},
{
    method: 'GET',
    url: '/attend/:id',
    handler: getAttend
}]

module.exports = routes