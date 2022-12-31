const router = require('express').Router();
const isAuthorized = require('../Configurations//isAuthorized');
const allEndpoints=require('./endpoints');

let db = require('../db');

router.get('/', async (req, res) => {

  let sql_get_Stadiums = `SELECT * from Stadiums`;
  let executed = await applyQuery(sql_get_Stadiums);

  return res.status(200).json(executed)
});


// Create a new stadium
// POST: /stadiums
router.post('/', isAuthorized(allEndpoints.manager), async (req, res) => {
  //
  let name = req.body.Name;
  let numRows = req.body.NumRows;
  let numSeatsPerRow = req.body.NumSeatsPerRow;
  if (!name || !numRows || !numSeatsPerRow) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  // select name
  let sql_select_name = `SELECT Name from Stadiums where Name = '${name}'`;
  let executed = await applyQuery(sql_select_name);
  if (executed.length > 0) {
    return res.status(400).json({ msg: "Stadium name already exists" });
  }

  let sql_create_stadium = `INSERT INTO Stadiums (Name, NumRows, NumSeatsPerRow) VALUES ('${name}', ${numRows}, ${numSeatsPerRow})`;
  executed = await applyQuery(sql_create_stadium);
  return res.status(200).json({ msg: "Stadium created successfully" });
});

router.put('/:StadiumID', isAuthorized(allEndpoints.manager), async (req, res) => {
  //
  let name = req.body.Name;
  let numRows = req.body.NumRows;
  let numSeatsPerRow = req.body.NumSeatsPerRow;
  let id = req.params.StadiumID;


  // select name
  let sql_select_name = `update stadiums set Name = '${name}', NumRows = ${numRows}, NumSeatsPerRow = ${numSeatsPerRow} where ID = ${id}`;
  let executed = await applyQuery(sql_select_name);
  if (executed) {
    return res.status(200).json({ msg: "Stadium Updates Successfully" });
  }
});

const applyQuery = (query) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        db.query(query, (error, rows) => {
          if (!error) {
            resolve(rows);
          }
          else { 
            reject(new Error(error));
          }
        })
      }, 10);
    });
  };

module.exports = router;
