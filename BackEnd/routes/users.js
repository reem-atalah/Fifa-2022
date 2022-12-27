const router = require("express").Router();

var db = require("../db");

// SQL injection? what's that?

// Get all matches
router.get("/", async (req, res) => {
	var sql_query = `
  SELECT * FROM Users`;
	var executed1 = await applyQuery(sql_query);
	// console.log("Users are", executed1);
	return res.status(200).json({
		Users: executed1,
	});
});

router.get("/:username", async (req, res) => {
	const username = req.params.username;
	// console.log('Getting Match with id: ' + ID);

	var sql_query1 = `SELECT * from Users where username = "${username}";`;

	try {
		var executed1 = await applyQuery(sql_query1);
		// No Matches Found
		if (executed1.length == 0) {
			return res.status(400).json({
				meta: {
					status: 500,
					msg: "INTERNAL_SERVER_ERROR",
				},

				res: {
					error: "No user found with given ID",
					data: "",
				},
			});
		}
		// console.log(executed1);
		return res.status(200).json(executed1);
	} catch (e) {
		console.log(e);
		return res.status(404).send(e);
	}
});

router.put("/:username", async (req, res) => {
	const username = req.params.username;

	// TODO: check for null values
	// TODO: check for invalid values :O
	// TODO: conflict on Stadium
	// TODO: conflict on Teams

	var Role = req.body.role;

	// update query
	var sql_query = `UPDATE Users SET `;

	if (Role) {
		sql_query += `Role = "${Role}", `;
	}

	if (sql_query.endsWith(", ")) {
		sql_query = sql_query.slice(0, -2);
		sql_query += ` WHERE Username = "${username}";`;
		//
		try {
			var executed = await applyQuery(sql_query);
			if (executed) {
				return res.status(200).json({
					res: "User Updated Successfully",
				});
			}
		} catch (e) {
			console.log(e);
			return res.status(400).send(e);
		}
	} else {
		return res.status(400).json({
			meta: {
				status: 500,
				msg: "INTERNAL_SERVER_ERROR",
			},
			res: {
				error: "No data to update",
				data: "",
			},
		});
	}
});

router.delete("/:username", async (req, res) => {
	const username = req.params.username;

	var sql_query = `DELETE FROM Users where username = "${username}";`;
	try {
		var executed = await applyQuery(sql_query);
		return res.status(200).json({
			res: "User deleted Successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(400).send(e);
	}
});

const applyQuery = (query) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			db.query(query, (error, rows) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(new Error(error));
				}
			});
		}, 10);
	});
};

module.exports = router;
