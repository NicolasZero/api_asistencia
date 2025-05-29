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
        console.log(error);
        return reply.code(409).send({ error: "error", status: "failed" });
    }
};

const addWorker = async (request, reply) => {
    try {
        const { identity_card, is_foreign, full_name, gender_id, department_id, position_id, payroll_type_id, area_coordination_id } = request.body;

        // validations
        if (!identity_card || typeof is_foreign !== "boolean" || !full_name || !gender_id || !department_id || !position_id || !payroll_type_id || !area_coordination_id) {
            return reply.code(400).send({ error: "body not valid", status: "failed" });
        }

        const textQuery = `INSERT INTO general.workers (identity_card, is_foreign, full_name, gender_id, department_id, position_id, payroll_type_id, area_coordination_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
        const resp = await query(textQuery, [identity_card, is_foreign, full_name, gender_id, department_id, position_id, payroll_type_id, area_coordination_id])
        return reply.send({ data: resp.rows, status: "ok" });

    } catch (error) {
        console.log(error);
        return reply.code(409).send({ error: "error", status: "failed" });
    }
}

const deactivateWorker = (option) => async (request, reply) => {
    const {value} = request.params
    const nvalue = Number(value)
    // console.log(nvalue);
    
    // validations
    if (!nvalue || typeof nvalue !== "number") {
        return reply.code(400).send({ error: "body not valid", status: "failed" });
    }
    
    const textQuery = `UPDATE general.workers SET status = false WHERE ${option} = $1 RETURNING *`
    const resp = await query(textQuery, [nvalue])
    return reply.send({ data: resp.rows, status: "ok" });
    // return reply.code(409).send({ data: "Prueba", status: "ok" });
}

module.exports = {
    getAllWorkers,
    getWorker,
    addWorker,
    deactivateWorker
}