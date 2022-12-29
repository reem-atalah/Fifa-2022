const router = require('express').Router();
const isAuthorized = require('../Configurations//isAuthorized');
const allEndpoints=require('./endpoints');
var db = require('../db');

// delete user by admin only
router.delete('/:Username', isAuthorized(allEndpoints.admin),
 async (req, res) => {

    var username = req.params.Username;
    var sql_query1 = `DELETE FROM Users where Username = "${username}";`

    try {
    var excuted = await applyQuery(sql_query1);

    if(!excuted)
        // check if user exists
        return res.status(501).json("User doesn't exist");
    return res.status(200).json('User: ' + username +' deleted');
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
        else { 
          reject(new Error(error));
        }
      })
    }, 10);
  });
};

module.exports = router;
