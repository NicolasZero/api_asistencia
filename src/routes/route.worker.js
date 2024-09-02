// const {getWorker, getAllWorkers} = require('../controllers/controller.worker')
const controller = require('../controllers/controller.worker')

module.exports = async function (fastify) {
    // buscar todos los trabajadores
    // url example:  /attendance/pag/1/lim/1
    fastify.get('/pag/:page/lim/:limit', controller.getAllWorkers)

    // buscar trabajador por id
    fastify.get('/id/:value', controller.getWorker('id'))

    // buscar trabajador por cedula
    fastify.get('/ic/:value', controller.getWorker('identity_card'))
}