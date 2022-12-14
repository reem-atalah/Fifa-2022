const router = require('express').Router();

var db = require('../db');

router.get('/', async (req, res) => {

    let sql_get_teams = `SELECT * from Teams`;
    let executed = await applyQuery(sql_get_teams);

    return res.json(executed)

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
