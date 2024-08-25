const {getWorker, getAllWorkers} = require('../controllers/controller.worker')

const routes = [{
    method: 'GET',
    url: '/worker/pag/:page/lim/:limit',
    // url example:  /attendance/pag/1/lim/10
    handler: getAllWorkers
},
{
    method: 'GET',
    url: '/worker/id/:value',
    handler: getWorker('id')
},
{
    method: 'GET',
    url: '/worker/ic/:value',
    handler: getWorker('identity_card')
}]
module.exports = routes