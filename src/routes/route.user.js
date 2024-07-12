const routesUser = [{
    method: 'GET',
    url: '/user',
    handler: function (request, reply) {
        reply.send({ data: 'all user data' })
    }
},
{
    method: 'GET',
    url: '/user/:id',
    handler: function (request, reply) {
        reply.send({ data: 'a user data' })
    }
}]

module.exports = routesUser