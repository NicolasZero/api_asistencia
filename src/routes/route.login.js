const routes = [{
    method: 'POST',
    url: '/login',
    handler: function (request, reply) {
        reply.send({ data: 'login process' })
    }
}]
module.exports = routes