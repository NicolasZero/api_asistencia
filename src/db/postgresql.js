const { Pool, Client } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

const verification = async () => {
  try {
    const res = await pool.query("SELECT $1::text as message", [
      "Connected to the database!",
    ])
    console.log(res.rows[0].message) // Hello world!
  } catch (err) {
    console.error(err)
    process.exit(1);
  }
}

module.exports = {
  query,
  verification,
};
