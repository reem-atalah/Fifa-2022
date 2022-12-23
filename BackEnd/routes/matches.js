const router = require('express').Router();

var db = require('../db');

// SQL injection? what's that?

// Get all matches
router.get('/', async (req, res) => {

  var sql_query = `SELECT * from Matches`;
  executed = await applyQuery(sql_query);

  res.send(executed);
});

// Getting Match info
// GET /matches/:id
router.get('/:id', async (req, res) => {

  const ID = req.params.id;
  // console.log('Getting Match with id: ' + ID);

  var sql_query1 = `SELECT * from Matches where ID = "${ID}";`
  try {
    var executed1 = await applyQuery(sql_query1);
    // No Matches Found
    if (executed1.length == 0) {
      return res.status(400).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },
  
        'res': {
          'error': 'No match found with given ID',
          'data': '',
        },
      });
    }
    // console.log(executed1);

    return res.status(200).json(executed1);
  }
  catch (e) {
    console.log(e);
    return res.status(404).send(e);
  }
});

// Creating a match
router.post('/', async (req, res) => {

  // Authourization
  // if (global_type != "Admin" && global_type != "Manager") {
  //   return res.status(401).send("Unauthorized");
  // }

  // TODO: check for null values
  // TODO: check for invalid values :O
  var StadiumID = req.body.StadiumID;
  var Time      = req.body.Time;
  var Team1     = req.body.Team1;
  var Team2     = req.body.Team2;
  var Referee   = req.body.Referee;
  var Linesman1 = req.body.Linesman1;
  var Linesman2 = req.body.Linesman2;

  console.log('Posting to Matches');
  console.log(`Data: ${Team1} vs ${Team2} at ${StadiumID} at ${Time}, Referees: ${Referee}, ${Linesman1}, ${Linesman2}`);

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
    // if (Referee == Linesman1 || Referee == Linesman2 || Linesman1 == Linesman2) {
    //   throw "Referees and Linesmen must be different";
    // }

    // Teams Have conflicting matches
    var sql_query1 = `SELECT Time from Matches where Team1 = "${Team1}" or Team2 = "${Team1}" or Team1 = "${Team2}" or Team2 = "${Team2}";`
    var executed1 = await applyQuery(sql_query1);
    for (var i = 0; i < executed1.length; i++) {
      // handle datetime object from mysql
      var time1 = new Date(executed1[i].Time);
      var time2 = new Date(Time);
      //
      // console.log(time1);
      // console.log(time2);
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
      //
      // console.log(time1);
      // console.log(time2);
      // Differnece in minutes
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

    // console.log(sql_query);
    var executed = await applyQuery(sql_query);

    if (executed) {
      // console.log("Match Created Successfully");
      // console.log(executed.insertId);
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

  // if (global_type != "Admin" && global_type != "Manager") {
  //   return res.status(401).send("Unauthorized");
  // }

  const id = req.params.id;

  // TODO: check for null values
  // TODO: check for invalid values :O
  // TODO: conflict on Stadium
  // TODO: conflict on Teams

  var StadiumID = req.body.StadiumID;
  var Time      = req.body.Time;
  var Team1     = req.body.Team1;
  var Team2     = req.body.Team2;
  var Referee   = req.body.Referee;
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
  else
  {
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

  // if (global_type != "Admin" && global_type != "Manager") {
  //   return res.status(401).send("Unauthorized");
  // }

  const id = req.params.id;

  var sql_query = `DELETE FROM Matches where ID = "${id}";`
  try {
    var executed = await applyQuery(sql_query);
  }
  catch (e) {
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
        }
        else { reject(new Error(error)); }
      })
    }, 10);
  });
};

module.exports = router;
