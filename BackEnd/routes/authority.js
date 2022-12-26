const router = require('express').Router();

var db = require('../db');


router.post('/', async (req, res) => {

    // assume we have an authority page 
    // that sees all users that want to be accepted/refuse authority

    // check that the user is an admin
    if (global_type != "Admin") {
        return res.status(401).json({
            'meta': {
                'status': 500,
                'msg': 'INTERNAL_SERVER_ERROR',
            },
            
            'res': {
                'error': 'You are not an admin, You are not allowed to access this page',
                'data': '',
            },
        });
    }

//   get all users that want to be a manager
// I need to know, I will have the username who want to be a manager or go on them all
  var sql_query1 = `SELECT * from Users where Role = 2;`
  var executed1 = await applyQuery(sql_query1);

  if(executed1.length != 0){
    //  get the user that wants to be a manager
    for (var i = 0; i < executed1.length; i++) {
        // change the role of the user to manager if he is accepted
        if (req.body.Accepted == "true" && req.body.Username == executed1[i].Username) {
            var sql_query2 = `UPDATE Users SET Role = 1 where Username = "${executed1[i].Username}";`
            var executed2 = await applyQuery(sql_query2);
        }
        // delete the user if he is refused
        else if (req.body.Accepted == "false" && req.body.Username == executed1[i].Username) {
            var sql_query3 = `DELETE FROM Users where Username = "${executed1[i].Username}";`
            var executed3 = await applyQuery(sql_query3);
        }

        
    }
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
