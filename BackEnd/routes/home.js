const router = require('express').Router();
var db = require('../db');

// GET //

router.get('/', async(req, res) => {

var matches = [];
sql_query = "SELECT * FROM Matches"
matches.push(await applyQuery(sql_query));


return res.status(200).json(matches);
 
});

const applyQuery = (query) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
              db.query(query,(error, rows) => {
                  if(!error)
                    {                           
                      resolve(rows);
                    }
                  else
                   {reject(new Error(error));}
             })     
      }, 10);
  });
};

module.exports = router;