const jwt = require('jsonwebtoken');
const router = require("express").Router();
const isAuthorized = require('../Configurations//isAuthorized');
const allEndpoints=require('./endpoints');
let db = require("../db");

// SQL injection? what's that?

// Get all matches
router.get("/", async (req, res) => {
	let sql_query = `
  SELECT m.ID, m.Time, m.Referee, m.Linesman1, m.Linesman2, s.Name as Stadium, t1.Name as Team1Name, t2.Name as Team2Name
  FROM Matches as m 
  left join Stadiums as s on m.StadiumID = s.ID
  left join Teams as t1 on m.Team1 = t1.ID
  left join Teams as t2 on m.Team2 = t2.ID;`;
	let executed1 = await applyQuery(sql_query);

	return res.status(200).json({
		matches: executed1,
	});
});

// Getting Match info with the stadium
// GET /matches/:id
router.get('/:id', async (req, res) => {

  const ID = req.params.id;

  let username = await getUsernameFromToken(req);

  let sql_query1 = `
  SELECT m.ID, m.Time, m.Referee, m.Linesman1, m.Linesman2, s.Name as Stadium, s.NumRows as Number_Rows, s.NumSeatsPerRow as NumSeatsPerRow, 
  t1.Name as Team1Name, t2.Name as Team2Name, t1.picture as Team1Picture, t2.picture as Team2Picture
  FROM matches as m 
  left join stadiums as s on m.StadiumID = s.ID
  left join teams as t1 on m.Team1 = t1.ID
  left join teams as t2 on m.Team2 = t2.ID
  where m.ID = ${ID};`;

	try {
		let executed1 = await applyQuery(sql_query1);
		// No Matches Found
		if (executed1.length == 0) {
      return res.status(404).json({msg: 'Match not Found'});
    }
		let matchObject = executed1[0];

    // User's seats
    userSeatsList = [];
    if (username != null) {
      let sql_query_user_sets = `SELECT  SeatNo FROM Reserve 
      join Users on UserID = ID
      where MatchID = ${ID} and Username = "${username}";`;
      let executed2 = await applyQuery(sql_query_user_sets);
      for (seat in executed2) userSeatsList.push(executed2[seat]["SeatNo"]);
    }

    // Others' seats
    nonUserSeatList = [];
		let sql_query_not_user_seats = `SELECT SeatNo FROM Reserve 
    join Users on UserID = ID
    where MatchID = ${ID} and Username != "${username}" ;`;
		let executed3 = await applyQuery(sql_query_not_user_seats);
		for (seat in executed3) nonUserSeatList.push(executed3[seat]["SeatNo"]);

		matchObject["UserList"] = userSeatsList;
		matchObject["OtherList"] = nonUserSeatList;
		return res.status(200).json({
			...matchObject,
		});
	} catch (e) {
		console.log(e);
		return res.status(404).send(e);
	}
});

// Creating a match
router.post('/', isAuthorized(allEndpoints.AuthMatch),
 async (req, res) => {

  let StadiumID = req.body.StadiumID;
  let Time = req.body.Time;
  let Team1 = req.body.Team1;
  let Team2 = req.body.Team2;
  let Referee = req.body.Referee;
  let Linesman1 = req.body.Linesman1;
  let Linesman2 = req.body.Linesman2;

  // Valid Names
  const regex = /^[a-zA-Z][a-zA-Z \-_,]*$/;
  if (!regex.test(Referee) || !regex.test(Linesman1) || !regex.test(Linesman2)) {
    return res.status(400).json({msg: 'Null/Invalid Referee or Linesmen values'});
  }

  // check if Time value is DateTime
  const te = new Date(req.body.Time);
  if (te == "Invalid Date") {
    return res.status(500).json({msg: 'Can"t Decode Time value as DateTime Object'});
  }

  try {
    // Duplicate
    if (Team1 == Team2) {
      return res.status(400).json({msg: 'Team1 and Team2 can"t be the same'});
    }
    // null / invalid
    for (team of [Team1, Team2]) {
      let sq = `SELECT * FROM Teams WHERE ID = ${team};`;
      let ex = await applyQuery(sq);
      if (ex.length == 0) {
        return res.status(400).json({msg: 'null/invalid Team1 or Team2 values'});
      }
    }

    // Teams Have conflicting matches
    if (await CheckConflictingMatchesTeams(Team1, Team2, Time)) {
      return res.status(500).json({ msg: 'Teams have conflicting matches' });
    }

    // Conflict in Stadium
    if (await CheckConflictingMatchesStadium(StadiumID, Time)) {
      return res.status(500).json({ msg: 'Stadium has conflicting matches' });
    }

    // Insert new match
    let sql_query = `INSERT INTO Matches (StadiumID, Time, Team1, Team2, Referee, Linesman1, Linesman2)
          VALUES ("${StadiumID}", "${Time}", "${Team1}", "${Team2}", "${Referee}", "${Linesman1}", "${Linesman2}");`
    let executed = await applyQuery(sql_query);
    if (executed) {
      id = executed.insertId

      let sql_query1 = `SELECT * from Matches where ID = "${id}";`
      let executed1 = await applyQuery(sql_query1);

      return res.status(200).json(executed1);
    }
    else {
      throw "Error in inserting new match";
    }
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e);
  }
});

// Updating a match
router.put('/:id', isAuthorized(allEndpoints.AuthMatch),
async (req, res) => {

  const id = req.params.id;

  let StadiumID = req.body.StadiumID;
  let Time = req.body.Time;
  let Team1 = req.body.Team1;
  let Team2 = req.body.Team2;
  let Referee = req.body.Referee;
  let Linesman1 = req.body.Linesman1;
  let Linesman2 = req.body.Linesman2;

  // get target match
  let sq = `SELECT * FROM Matches WHERE ID = "${id}";`
  let ex = await applyQuery(sq);
  if (ex.length == 0) return res.status(404).json({msg: 'Match not found'});

  // update query
  let sql_query = `UPDATE Matches SET `;

  if (StadiumID) {
    let sq = `SELECT * FROM Stadiums WHERE ID = ${StadiumID};`;
    let ex = await applyQuery(sq);
    if (ex.length == 0) return res.status(400).json({msg: 'StadiumID value is not valid'});
    sql_query += `StadiumID = "${StadiumID}", `;
  }
  else StadiumID = ex[0].StadiumID;

  if (Time) {
    if (new Date(Time) == "Invalid Date") return res.status(400).json({msg: 'Can"t Decode Time value as DateTime Object'});
    sql_query += `Time = "${Time}", `;
  }
  else Time = ex[0].Time;

  if (Team1) {
    let sq = `SELECT * FROM Teams WHERE ID = ${Team1};`;
    let ex = await applyQuery(sq);
    if (ex.length == 0) return res.status(400).json({msg: 'Team1 value is not valid'});
    sql_query += `Team1 = "${Team1}", `;
  }
  else Team1 = ex[0].Team1;

  if (Team2) {
    let sq = `SELECT * FROM Teams WHERE ID = ${Team2};`;
    let ex = await applyQuery(sq);
    if (ex.length == 0) return res.status(400).json({msg: 'Team2 value is not valid'});
    sql_query += `Team2 = "${Team2}", `;
  }
  else Team2 = ex[0].Team2;
  if (Team1 == Team2) return res.status(400).json({msg: 'Teams must be different'});

  if (Referee) {
    const regex = /^[a-zA-Z][a-zA-Z \-_,]*$/;
    if (!regex.test(Referee)) return res.status(400).json({msg: 'Referee value is not valid'});
    sql_query += `Referee = "${Referee}", `;
  }
  else Referee = ex[0].Referee;

  if (Linesman1) {
    const regex = /^[a-zA-Z][a-zA-Z \-_,]*$/;
    if (!regex.test(Linesman1)) return res.status(400).json({msg: 'Linesman1 value is not valid'});
    sql_query += `Linesman1 = "${Linesman1}", `;
  }
  else Linesman1 = ex[0].Linesman1;

  if (Linesman2) {
    const regex = /^[a-zA-Z][a-zA-Z \-_,]*$/;
    if (!regex.test(Linesman2)) return res.status(400).json({msg: 'Linesman2 value is not valid'});
    sql_query += `Linesman2 = "${Linesman2}", `;
  }
  else Linesman2 = ex[0].Linesman2;

  if (sql_query.endsWith(', ')) {
    sql_query = sql_query.slice(0, -2);
    sql_query += ` WHERE ID = "${id}";`;

    // teams conflict
    if (await CheckConflictingMatchesTeams(Team1, Team2, Time, id)) {
      return res.status(500).json({ msg: 'Teams have conflicting matches' });
    }

    // stadium conflict
    if (await CheckConflictingMatchesStadium(StadiumID, Time, id)) {
      return res.status(500).json({ msg: 'Stadium has conflicting matches' });
    }

    // TODO:
    // CONFLICT If any user that has tickets for this match is going to be in another match at the same time
    {
      // Get all users who has tickets for this match
      let sq = `SELECT UserID FROM Reserve WHERE MatchID = ${id};`;
      let ex = await applyQuery(sq);
      console.log(ex);
    }

    //
    try {
      let executed = await applyQuery(sql_query);
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
    return res.status(400).json({msg: 'No values to update'});
  }
});

// Delete a match
router.delete('/:id',isAuthorized(allEndpoints.AuthMatch), async (req, res) => {

  const id = req.params.id;

  let sql_query = `DELETE FROM Matches where ID = "${id}";`
  try {
    let ex = await applyQuery(sql_query);
    console.log(ex);
    if (ex.affectedRows == 0)
      return res.status(404).json({msg: "Match Not Found"});
    return res.status(200).json({msg: "Match Deleted Successfully"});
  }
  catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

// Seats status
router.get("/:id/seats", async (req, res) => {

	const id = req.params.id;

  // Getting username from token
  let username = await getUsernameFromToken(req);

	// get max seats
	let sql_query1 = `SELECT S.NumRows * S.NumSeatsPerRow as MaxSeats
                    FROM Stadiums AS S, Matches AS M
                    WHERE M.ID = "${id}" AND M.StadiumID = S.ID;`;
	let executed1 = await applyQuery(sql_query1);
	if (executed1.length == 0) {
		return res.status(404).json({msg: 'Match not found'});
	}
  let maxSeats = executed1[0].MaxSeats;

  // User's Seats
  userSeatsList = [];
  if (username != null) {
    let sql_query_user_sets = `SELECT SeatNo FROM Reserve 
    join Users on UserID = ID
    where MatchID = ${id} and Username = "${username}";`;
    let executed2 = await applyQuery(sql_query_user_sets);
    for (seat in executed2) userSeatsList.push(executed2[seat]["SeatNo"]);
  }

  // Others' seats
  nonUserSeatList = [];
  let sql_query_not_user_seats = `SELECT SeatNo FROM Reserve 
  join Users on UserID = ID
  where MatchID = ${id} and Username != "${username}" ;`;
  if (username == null)
    sql_query_not_user_seats = `SELECT SeatNo FROM Reserve Where MatchId = ${ID}`;
  //
  let executed3 = await applyQuery(sql_query_not_user_seats);
  for (seat in executed3) nonUserSeatList.push(executed3[seat]["SeatNo"]);

  // return json of both lists
  return res.status(200).json({ "UserSeats": userSeatsList, "OthersSeats": nonUserSeatList, "maxSeats": maxSeats });
});

// Reserve vacant seats
// parameters -> seat number
router.post("/:id/seats", isAuthorized(allEndpoints.reserve), async (req, res) => {

	const mid = req.params.id;
  const username = await getUsernameFromToken(req);
	const seats = req.body.seats;

	// console.log(seats)
	if (!seats || seats.length == 0) {
		return res.status(400).json({msg: "no seats requested"});
	}

	let sql_query = `SELECT ID FROM Users WHERE Username = "${username}";`;
  console.log(sql_query);
	let executed = await applyQuery(sql_query);
	const uid = executed[0].ID;

	// User has no conflicting match!
  // get match time
	sql_query = `SELECT Time FROM Matches WHERE ID = "${mid}";`;
	executed = await applyQuery(sql_query);
  if (!executed.length) {
    return res.status(404).json({msg: 'Match not found'});
  }
	const matchTime = new Date(executed[0].Time);
	//
	sql_query = `SELECT M.Time FROM Reserve AS R, Matches AS M
               WHERE R.UserID = "${uid}" AND R.MatchID != "${mid}" AND M.ID = R.MatchID;`;
	executed = await applyQuery(sql_query);
  //
  if (await CheckConflictingTimes(executed, matchTime, 120)) {
    return res.status(500).json({msg: 'you have another conflicting match'});
  }

	// get maxSeats
	sql_query = `SELECT S.NumRows * S.NumSeatsPerRow as MaxSeats
               FROM Stadiums AS S JOIN Matches AS M ON S.ID = M.StadiumID
               WHERE M.ID = "${mid}";`;
	executed = await applyQuery(sql_query);
	const maxSeats = executed[0].MaxSeats;
	// console.log(maxSeats);

  // get reserved seats
	sql_query = `SELECT SeatNo FROM Reserve WHERE Reserve.MatchID = "${mid}";`;
	executed = await applyQuery(sql_query);
	let reservedSeats = new Set();
	for (let i = 0; i < executed.length; i++) {
		reservedSeats.add(executed[i].SeatNo);
	}
	// all requested seats should be available
	let Fail = false;
	for (let i = 0; i < seats.length; i++) {
		// console.log(seats[i]);
		Fail |= seats[i] <= 0 || seats[i] > maxSeats;
		Fail |= reservedSeats.has(seats[i]);
	}
	//
	if (Fail) {
		return res.status(400).json({msg: "Not all requested seats are available"});
  }

	// Reserve
	for (let i = 0; i < seats.length; i++) {
		let seatNo = seats[i];
		let sql_query = `INSERT INTO Reserve (UserID, MatchID, SeatNo)
                     VALUES ("${uid}", "${mid}", "${seatNo}");`;
		let executed = await applyQuery(sql_query);
	}

	return res.status(200).json({ res: "Seats reserved successfully" });
});

// Cancel reservation
// Same Format as reserve
router.delete("/:id/seats/", isAuthorized(allEndpoints.reserve), async (req, res) => {

	const mid = req.params.id;
  const username = await getUsernameFromToken(req);
	const seats = req.body.seats;
	if (!seats or seats.length == 0) {
		return res.status(400).json({msg: "Empty request"});
  }

	let sql_query = `SELECT ID FROM Users WHERE Username = "${username}";`;
	let executed = await applyQuery(sql_query);
	const uid = executed[0].ID;
	// const uid = 1;

	// get reserved seats by this user
	sql_query = `SELECT SeatNo FROM Reserve WHERE UserID = "${uid}" AND MatchID = "${mid}";`;
	executed = await applyQuery(sql_query);
	// store reserved seats in a set
	let reservedSeats = new Set();
	for (let i = 0; i < executed.length; i++) {
		reservedSeats.add(executed[i].SeatNo);
	}
	// all requested seats should be available
	let Fail = false;
	for (let i = 0; i < seats.length; i++) {
		// console.log(seats[i]);
		Fail |= !reservedSeats.has(seats[i]);
	}
	//
	if (Fail) {
		return res.status(400).json({msg: "Not all requested seats are reserved by this user"});
  }

  // Cancel Reservations
	for (let i = 0; i < seats.length; i++) {
		let seatNo = seats[i];
		let sql_query = `DELETE FROM Reserve WHERE UserID = "${uid}" AND MatchID = "${mid}" AND SeatNo = "${seatNo}";`;
		let executed = await applyQuery(sql_query);
	}

	return res.status(200).json({ res: "Reservations cancelled successfully" });
});

// Check conflict for Teams
const CheckConflictingMatchesTeams = async (Team1, Team2, Time, exceptID=null) => {
    //
    let t2 = new Date(Time);
    let sq = `SELECT Time from Matches WHERE `
    if (exceptID) sq += `ID != "${exceptID}" AND(`;
    sq += `Team1 = "${Team1}" or Team2 = "${Team1}" or Team1 = "${Team2}" or Team2 = "${Team2}"`
    if (exceptID) sq += `)`;
    sq += ';';
    //
    let ex = await applyQuery(sq);
    return await CheckConflictingTimes(ex, t2, 120);
}

// Check conflict for Stadium
const CheckConflictingMatchesStadium = async (StadiumID, Time, exceptID=null) => {
  //
  let t2 = new Date(Time);
  let sq = `SELECT Time from Matches WHERE `
  if (exceptID) sq += `ID != "${exceptID}" AND(`;
  sq += `StadiumID = "${StadiumID}"`
  if (exceptID) sq += `)`;
  sq += ';';
  //
  let ex = await applyQuery(sq);
  return await CheckConflictingTimes(ex, t2, 120);
}

// Check conflict from array, time and minutes
const CheckConflictingTimes = async (ex, t2, minutes) => {
    //
    for (let i = 0; i < ex.length; i++) {
      // handle datetime object from mysql
      let t1 = new Date(ex[i].Time);
      // Differnece in minutes
      let diff = Math.abs(t1 - t2) / 1000 / 60;
      if (diff < minutes) {
        return true;
      }
    }
  return false;
}

const getUsernameFromToken = async (req) => {
  let username = null;
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.KEY);
      if (decoded && decoded.username) {
        username = decoded.username.toString();
      }
    }
  }
  return username;
}


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

module.exports = router
