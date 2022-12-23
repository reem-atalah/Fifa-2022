const router = require('express').Router();

var db = require('../db');

// Getting Match info
// GET /matches/:id
router.get('/:id', async (req, res) => {

  const ID = req.params.id;
  console.log('Getting Match with id: ' + ID);

  var sql_query1 = `SELECT * from Matches where ID = "${ID}";`
  try {
    var executed1 = await applyQuery(sql_query1);
    // No Matches Found
    if (executed1.length == 0) {
      // throw "No Match Found With Given ID";
      return res.status(401).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },
  
        'res': {
          'error': 'No Match Found With Given ID',
          'data': '',
        },
      });
    }
    console.log(executed1);

    return res.status(200).json(executed1);

  }
  catch (e) {
    console.log(e);
    return res.status(404).send(e);
  }

});

// Creating a match
router.post('/', async (req, res) => {

  var StadiumID   = req.body.StadiumID;
  var Time        = req.body.Time;
  var Team1       = req.body.Team1;
  var Team2       = req.body.Team2;
  var Referee     = req.body.Referee;
  var Linesman1   = req.body.Linesman1;
  var Linesman2   = req.body.Linesman2;

  console.log('Posting to Matches');
  console.log(`Data: ${Team1} vs ${Team2} at ${StadiumID} at ${Time}, Referees: ${Referee}, ${Linesman1}, ${Linesman2}`);

  var sql_query = `INSERT INTO Matches (StadiumID, Time, Team1, Team2, Referee, Linesman1, Linesman2) 
        VALUES ("${StadiumID}", "${Time}", "${Team1}", "${Team2}", "${Referee}", "${Linesman1}", "${Linesman2}");`

  try {
    if (Team1 == Team2) {
      // throw "Team1 and Team2 cannot be the same";
      return res.status(401).json({
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
    if (Referee == Linesman1 || Referee == Linesman2 || Linesman1 == Linesman2) {
      // throw "Referees and Linesmen must be different";
      return res.status(401).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },
  
        'res': {
          'error': 'Referees and Linesmen must be different',
          'data': '',
        },
      });
    }
    // console.log(sql_query);
    var executed = await applyQuery(sql_query);

    // TODO:
    // Check Team1 or 2 have no conflicting matches
    // Check Stadium is Free

    if (executed) {
      // console.log("Match Created Successfully");
      // console.log(executed.insertId);
      id = executed.insertId

      var sql_query1 = `SELECT * from Matches where ID = "${id}";`
      var executed1 = await applyQuery(sql_query1);
      console.log(executed1);

      return res.status(200).json(executed1);
      // Redirect to Get /matches/id
      // return res.redirect('/matches/' + id); 
    }
  }
  catch (e) {
    console.log(e)
    return res.status(401).send(e);
  }
}
);

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
