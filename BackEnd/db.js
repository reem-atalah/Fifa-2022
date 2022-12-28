const dotenv = require('dotenv');
const util = require("util");

dotenv.config();
var mysql = require("mysql");

const pool = mysql.createPool({
	host: "127.0.0.1",
	port: process.env.sqlport || "3306",
	user: process.env.sqluser,
	password: process.env.sqlpassword,
	database: "FIFA_2022",
});

pool.getConnection((err, connection) => {
	if (err) throw err;
	else console.log("DB Connected to my sql");
	if (connection) connection.release();
	return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;
