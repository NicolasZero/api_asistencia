const { encrypt,compare } = require("../helpers/helperEncrypt.js");
const { query } = require("../db/postgresql");
// const { tokenSign, verifyToken } = require("../helpers/helperToken.js");

const register = async (request, reply) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return reply.code(400).send({ error: "body not valid", status: "failed" });
    }
    const hashPassword = await encrypt(password);
    return reply.send({status: "ok", data: {username,hashPassword}})

  } catch (error) {
    reply.code(500).send({ error: "error", status: "failed" });
    console.log(error)
  }
}

const authUser = async (request, reply) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return reply.code(400).send({ error: "body not valid", status: "failed" });
    }

    const resp = await query("SELECT * FROM attendance_control.view_users WHERE username = $1", [username])
    const passwordInDb = resp.rows.length !== 0 ? resp.rows[0].password : false;

    // valida que el usuario exista
    if (passwordInDb === false) {
      return reply.status(409).send({ status: "failed", error: "Usuario o contraseña no coinciden"  });
    }
    const checkPass = await compare(password, resp.rows[0].password);
    // const tokenSession = await tokenSign(response.rows[0]);
    const tokenSession = "token";
    if (checkPass) {
      return reply.send({status: "ok",data: resp.rows,tokenSession,});
    }
  } catch (error) {
    reply.code(500).send({ error: "error", status: "failed" });
    console.log(error)
  }
};

const refreshToken = async (request, reply) => {
  const refreshToken = request.headers.refresh
  const tokenData = await verifyToken(refreshToken)
  if (tokenData) {
    const tokenSession = await tokenSign({ id: tokenData._id });
    return reply.json({status: "OK",data: "refreshed",tokenSession})
  } else {
    return reply.code(409).send({ error: "Error en la autenticación del usuario", status: "failed" });
    console.log(error)
  }
}

module.exports = { authUser, refreshToken, register };