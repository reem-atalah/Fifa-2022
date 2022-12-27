const router = require('express').Router();

var db = require('../db');


router.post('/', async (req, res) => {

    // check that the user is an admin so he can delete other user
    if (global_type != "Admin") {
        return res.status(401).json('You are not an admin, You are not allowed to access this page');
    }

    var username = req.body.Username;
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
