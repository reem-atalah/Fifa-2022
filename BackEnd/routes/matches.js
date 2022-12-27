const router = require("express").Router();

var db = require("../db");

// SQL injection? what's that?

// Get all matches
router.get("/", async (req, res) => {
	var sql_query = `
  SELECT m.ID, m.Time, m.Referee, m.Linesman1, m.Linesman2, s.Name as Stadium, t1.Name as Team1Name, t2.Name as Team2Name
  FROM Matches as m 
  left join Stadiums as s on m.StadiumID = s.ID
  left join Teams as t1 on m.Team1 = t1.ID
  left join Teams as t2 on m.Team2 = t2.ID;`;
	var executed1 = await applyQuery(sql_query);

	return res.status(200).json({
		matches: executed1,
	});
});

// Getting Match info with the stadium
// GET /matches/:id
router.get('/:id', async (req, res) => {

  const ID = req.params.id;

  // var sql_query1 = `SELECT * from Matches where ID = "${ID}";
  var sql_query1 = `
  SELECT m.ID, m.Time, m.Referee, m.Linesman1, m.Linesman2, s.Name as Stadium, s.NumRows as Number_Rows, s.NumSeatsPerRow as NumSeatsPerRow, 
  t1.Name as Team1Name, t2.Name as Team2Name, t1.picture as Team1Picture, t2.picture as Team2Picture
  FROM matches as m 
  left join stadiums as s on m.StadiumID = s.ID
  left join teams as t1 on m.Team1 = t1.ID
  left join teams as t2 on m.Team2 = t2.ID
  where m.ID = ${ID} ;`;
  

  try {
    var executed1 = await applyQuery(sql_query1); 
    // No Matches Found
    if (executed1.length == 0) {
      return res.status(400).json("No match found with given ID");
    }
    let matchObject = executed1[0];

    let sql_query_user_sets = `SELECT  SeatNo FROM Reserve 
    join Users on UserID = ID
    where MatchID = ${ID} and Username = "${global_username}";`;

    let sql_query_not_user_seats = `SELECT  SeatNo FROM Reserve 
    join Users on UserID = ID
    where MatchID = ${ID} and Username != "${global_username}" ;`;

    let executed2 = await applyQuery(sql_query_user_sets);
    let executed3 = await applyQuery(sql_query_not_user_seats);



    userSeatsList = [] 
    nonUserSeatList = []
    for(seat in executed2) userSeatsList.push(executed2[seat]['SeatNo'])
    for(seat in executed3) nonUserSeatList.push(executed3[seat]['SeatNo'])

    matchObject['UserList'] = userSeatsList;
    matchObject['OtherList'] = nonUserSeatList;
    return res.status(200).json({
      matchObject,
    });
  }
  catch (e) {
    console.log(e);
    return res.status(404).send(e);
  }
});

// Creating a match
router.post('/', async (req, res) => {

  // Authourization
  if (global_type != "Admin" && global_type != "Manager") {
    return res.status(401).send("Unauthorized");
  }

  // TODO: check for null values
  // TODO: check for invalid values :O
  var StadiumID = req.body.StadiumID;
  var Time = req.body.Time;
  var Team1 = req.body.Team1;
  var Team2 = req.body.Team2;
  var Referee = req.body.Referee;
  var Linesman1 = req.body.Linesman1;
  var Linesman2 = req.body.Linesman2;

  console.log('Posting to Matches');
  console.log(`Data: ${Team1} vs ${Team2} at ${StadiumID} at ${Time}, Referees: ${Referee}, ${Linesman1}, ${Linesman2}`);

  // TODO: check conflicting time of teams

  var sql_query = `INSERT INTO Matches (StadiumID, Time, Team1, Team2, Referee, Linesman1, Linesman2)
        VALUES ("${StadiumID}", "${Time}", "${Team1}", "${Team2}", "${Referee}", "${Linesman1}", "${Linesman2}");`

  try {
    if (Team1 == Team2) {
      return res.status(400).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },

        'res': {
          'error': 'Team1 and Team2 cannot be the same',
          'data': '',
        },
      });
    }
    // TODO: check conflicting Referee or Linesmen have another match at this time

    // TODO: check if conflicting in choosing same person to multiple poitions in same match
    if (Referee == Linesman1 || Referee == Linesman2 || Linesman1 == Linesman2) {
      return res.status(401).send("Referees and Linesmen must be different");
    }

    // Teams Have conflicting matches
    var sql_query1 = `SELECT Time from Matches where Team1 = "${Team1}" or Team2 = "${Team1}" or Team1 = "${Team2}" or Team2 = "${Team2}";`
    var executed1 = await applyQuery(sql_query1);
    for (var i = 0; i < executed1.length; i++) {
      // handle datetime object from mysql
      var time1 = new Date(executed1[i].Time);
      var time2 = new Date(Time);
  
      // Differnece in minutes
      var diff = Math.abs(time1 - time2) / 1000 / 60;
      if (diff < 120) {
        return res.status(400).json({
          'meta': {
            'status': 500,
            'msg': 'INTERNAL_SERVER_ERROR',
          },

          'res': {
            'error': 'Teams have conflicting matches',
            'data': '',
          },
        });
      }
    }

    // Conflict in Stadium
    var sql_query2 = `SELECT Time from Matches where StadiumID = "${StadiumID}";`
    var executed2 = await applyQuery(sql_query2);
    if (executed2.length == 0) {
      return res.status(400).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },

        'res': {
          'error': 'No stadium found with given ID',
          'data': '',
        },
      });
    }
    for (var i = 0; i < executed2.length; i++) {
      // handle datetime object from mysql
      var time1 = new Date(executed2[i].Time);
      var time2 = new Date(Time);

      // Conflict match time in same Stadium
      var diff = Math.abs(time1 - time2) / 1000 / 60;
      if (diff < 120) {
        return res.status(400).json({
          'meta': {
            'status': 500,
            'msg': 'INTERNAL_SERVER_ERROR',
          },
          'res': {
            'error': 'Stadium is busy at this time',
            'data': '',
          },
        });
      }
    } 

    var executed = await applyQuery(sql_query);

    if (executed) {
      id = executed.insertId

      var sql_query1 = `SELECT * from Matches where ID = "${id}";`
      var executed1 = await applyQuery(sql_query1);
      // console.log(executed1);

      return res.status(200).json(executed1);
    }
  }
  catch (e) {
    console.log(e)
    return res.status(400).send(e);
  }
});

// Updating a match
router.put('/:id', async (req, res) => {

  if (global_type != "Admin" && global_type != "Manager") {
    return res.status(401).send("Unauthorized");
  }

  const id = req.params.id;

  // TODO: check for null values
  // TODO: check for invalid values :O
  // TODO: conflict on Stadium
  // TODO: conflict on Teams

  var StadiumID = req.body.StadiumID;
  var Time = req.body.Time;
  var Team1 = req.body.Team1;
  var Team2 = req.body.Team2;
  var Referee = req.body.Referee;
  var Linesman1 = req.body.Linesman1;
  var Linesman2 = req.body.Linesman2;

  // update query
  var sql_query = `UPDATE Matches SET `;

  if (StadiumID) {
    sql_query += `StadiumID = "${StadiumID}", `;
  }
  if (Time) {
    sql_query += `Time = "${Time}", `;
  }
  if (Team1) {
    sql_query += `Team1 = "${Team1}", `;
  }
  if (Team2) {
    sql_query += `Team2 = "${Team2}", `;
  }
  if (Referee) {
    sql_query += `Referee = "${Referee}", `;
  }
  if (Linesman1) {
    sql_query += `Linesman1 = "${Linesman1}", `;
  }
  if (Linesman2) {
    sql_query += `Linesman2 = "${Linesman2}", `;
  }

  if (sql_query.endsWith(', ')) {
    sql_query = sql_query.slice(0, -2);
    sql_query += ` WHERE ID = "${id}";`;
    //
    try {
      var executed = await applyQuery(sql_query);
      if (executed) {
        return res.status(200).json({
          "res": "Match Updated Successfully"
        });
      }
    }
    catch (e) {
      console.log(e)
      return res.status(400).send(e);
    }
  }
  else {
    return res.status(400).json({
      'meta': {
        'status': 500,
        'msg': 'INTERNAL_SERVER_ERROR',
      },
      'res': {
        'error': 'No data to update',
        'data': '',
      },
    });
  }
});

// Delete a match
router.delete('/:id', async (req, res) => {

  if (global_type != "Admin" && global_type != "Manager") {
    return res.status(401).send("Unauthorized");
  }

  const id = req.params.id;

  var sql_query = `DELETE FROM Matches where ID = "${id}";`
  try {
    await applyQuery(sql_query);
  }
  catch (e) {
    console.log(e);
    return res.status(400).send("No match found with this ID");
  }
});

// Seats status
router.get("/:id/seats", async (req, res) => {
	// if (global_type != "Admin" && global_type != "Manager") {
	//  return res.status(401).send("Unauthorized");
	//

  if (global_type != "Admin" && global_type != "Manager") {
   return res.status(401).send("Unauthorized");
  }
	const id = req.params.id;

	// get max seats
	var sql_query1 = `SELECT S.NumRows * S.NumSeatsPerRow as MaxSeats
                    FROM Stadiums AS S, Matches AS M
                    WHERE M.ID = "${id}" AND M.StadiumID = S.ID;`;
	var executed1 = await applyQuery(sql_query1);
	if (executed1.length == 0) {
		return res.status(400).json({
			meta: {
				status: 500,
				msg: "INTERNAL_SERVER_ERROR",
			},
			res: {
				error: "No match found with given ID",
				data: "",
			},
		});
	}

	var maxSeats = executed1[0].MaxSeats;
	var sql_query = `SELECT SeatNo FROM Reserve WHERE Reserve.MatchID = "${id}";`;
	var executed = await applyQuery(sql_query);
	// store reserved seats in a set
	var reservedSeats = new Set();
	for (var i = 0; i < executed.length; i++) {
		reservedSeats.add(executed[i].SeatNo);
	}
	// return status for each seat!
	var list = [];
	for (var i = 1; i <= maxSeats; i++) {
		list.push({ number: i, available: !reservedSeats.has(i) });
	}
	//
	return res.status(200).json({ res: list });
});

// Reserve vacant seats
// parameters -> seat number
router.post("/:id/seats", async (req, res) => {
	if (
		global_type != "Admin" &&
		global_type != "Manager" &&
		global_type != "Fan"
	) {
		return res.status(401).json({
			meta: {
				status: 401,
				msg: "UNAUTHORIZED",
			},
			res: {
				error: "Log in to use this feature",
				data: "",
			},
		});
	}

	const mid = req.params.id;
	const seats = req.body.seats;
	// console.log(seats)
	if (seats.length == 0) {
		return res.status(400).json({
			meta: {
				status: 400,
				msg: "BAD_REQUEST",
			},
			res: {
				error: "No seats to reserve",
				data: "",
			},
		});
	}

	console.log("nameeeeeeee: " + global_username);
	var sql_query = `SELECT ID FROM Users WHERE Username = "${global_username}";`;
	var executed = await applyQuery(sql_query);
	const uid = executed[0].ID;
	// const uid = 1;

	// User has no conflicting match!

	// get match time
	sql_query = `SELECT Time FROM Matches WHERE ID = "${mid}";`;
	executed = await applyQuery(sql_query);
	const matchTime = new Date(executed[0].Time);
	//
	sql_query = `SELECT M.Time FROM Reserve AS R, Matches AS M
               WHERE R.UserID = "${uid}" AND R.MatchID != "${mid}" AND M.ID = R.MatchID;`;
	executed = await applyQuery(sql_query);
	for (var i = 0; i < executed.length; i++) {
		const time = new Date(executed[i].Time);
		// Differnece in minutes
		var diff = Math.abs(time - matchTime) / 1000 / 60;
		if (diff < 120) {
			return res.status(400).json({
				meta: {
					status: 400,
					msg: "BAD_REQUEST",
				},
				res: {
					error: "You have another conflicting match",
					data: "",
				},
			});
		}
	}

	// get maxSeats
	sql_query = `SELECT S.NumRows * S.NumSeatsPerRow as MaxSeats
               FROM Stadiums AS S, Matches AS M
               WHERE M.ID = "${mid}" AND M.StadiumID = S.ID;`;
	executed = await applyQuery(sql_query);
	const maxSeats = executed[0].MaxSeats;
	// console.log(maxSeats);

	// get reserved seats
	sql_query = `SELECT SeatNo FROM Reserve WHERE Reserve.MatchID = "${mid}";`;
	executed = await applyQuery(sql_query);
	// store reserved seats in a set
	var reservedSeats = new Set();
	for (var i = 0; i < executed.length; i++) {
		reservedSeats.add(executed[i].SeatNo);
	}
	// all requested seats should be available
	var Fail = false;
	for (var i = 0; i < seats.length; i++) {
		// console.log(seats[i]);
		Fail |= seats[i] <= 0 || seats[i] > maxSeats;
		Fail |= reservedSeats.has(seats[i]);
	}
	//
	if (Fail) {
		return res.status(400).json({
			meta: {
				status: 400,
				msg: "BAD_REQUEST",
			},
			res: {
				error: "Not all requested seats are available",
				data: "",
			},
		});
	}

	// loop on json object seats
	for (var i = 0; i < seats.length; i++) {
		var seatNo = seats[i];
		var sql_query = `INSERT INTO Reserve (UserID, MatchID, SeatNo)
                     VALUES ("${uid}", "${mid}", "${seatNo}");`;
		var executed = await applyQuery(sql_query);
	}

	return res.status(200).json({ res: "Seats reserved successfully" });
});

// Cancel reservation
// Same Format as reserve
router.delete("/:id/seats/", async (req, res) => {
	if (
		global_type != "Admin" &&
		global_type != "Manager" &&
		global_type != "Fan"
	) {
		return res.status(401).json({
			meta: {
				status: 401,
				msg: "UNAUTHORIZED",
			},
			res: {
				error: "Log in to use this feature",
				data: "",
			},
		});
	}

	const mid = req.params.id;
	const seats = req.body.seats;
	// console.log(seats)
	if (seats.length == 0) {
		return res.status(400).json({
			meta: {
				status: 400,
				msg: "BAD_REQUEST",
			},
			res: {
				error: "Empty request",
				data: "",
			},
		});
	}

	console.log("nameeeeeeee: " + global_username);
	var sql_query = `SELECT ID FROM Users WHERE Username = "${global_username}";`;
	var executed = await applyQuery(sql_query);
	const uid = executed[0].ID;
	// const uid = 1;

	// User has no conflicting match!

	// get reserved seats by this user
	sql_query = `SELECT SeatNo FROM Reserve WHERE UserID = "${uid}" AND MatchID = "${mid}";`;
	executed = await applyQuery(sql_query);
	// store reserved seats in a set
	var reservedSeats = new Set();
	for (var i = 0; i < executed.length; i++) {
		reservedSeats.add(executed[i].SeatNo);
	}
	// all requested seats should be available
	var Fail = false;
	for (var i = 0; i < seats.length; i++) {
		// console.log(seats[i]);
		Fail |= !reservedSeats.has(seats[i]);
	}
	//
	if (Fail) {
		return res.status(400).json({
			meta: {
				status: 400,
				msg: "BAD_REQUEST",
			},
			res: {
				error: "Not all requested seats are reserved by this user",
				data: "",
			},
		});
	}

	// loop on json object seats
	for (var i = 0; i < seats.length; i++) {
		var seatNo = seats[i];
		// Delete
		var sql_query = `DELETE FROM Reserve WHERE UserID = "${uid}" AND MatchID = "${mid}" AND SeatNo = "${seatNo}";`;
		var executed = await applyQuery(sql_query);
	}

	return res.status(200).json({ res: "Reservations cancelled successfully" });
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
