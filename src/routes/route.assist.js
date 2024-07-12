const {getAllAssist, getAssist} = require('../controllers/controller.assist')

const routes = [{
    method: 'GET',
    url: '/assist',
    handler: getAllAssist
},
{
    method: 'GET',
    url: '/assist/:id',
    handler: getAssist
}]

module.exports = routes