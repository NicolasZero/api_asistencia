const { query } = require("../db/postgresql");

const getWorker = (option) => async (request, reply) => {
    try {
        const {value} = request.params
        // verifica que el request body sea valido
        if (!Number(value)) {
            return reply.code(400).send({ error: "params not valid", status: "failed" });
        }

        const textQuery = `SELECT * FROM general.view_workers WHERE ${option} = $1`
        const resp = await query(textQuery,[value])
        return reply.send({ data: resp.rows, status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
}

const getAllWorkers = async (request, reply) => {
    try {
        const { page, limit } = request.params

        // verifica que el request params sea valido
        if (!Number(page) || !Number(limit) || limit > 1000  || limit < 1) {
            return reply.code(400).send({ error: "params not valid", status: "failed" });
        }

        // calcula desde cual registro empezara a mostrar los resultados
        const offset = (page - 1) * limit

        const textQuery = `SELECT * FROM general.view_workers LIMIT ${limit} OFFSET ${offset}`
        const resp = await query(textQuery)
        return reply.send({ data: resp.rows, status: "ok" });
    } catch (error) {
        reply.code(409).send({ error: "error", status: "failed" });
        console.log(error);
    }
};



module.exports = {
    getAllWorkers,
    getWorker
}