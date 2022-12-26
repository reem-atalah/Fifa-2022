const router = require('express').Router();

var db = require('../db');


router.post('/', async (req, res) => {

    // check that the user is an admin so he can delete other user
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

    var username = req.body.Username;
    var sql_query1 = `DELETE FROM Users where Username = "${username}";`
    await applyQuery(sql_query1);

    return res.status(200).json({
        'meta': {
            'status': 200,
            'msg': 'OK',
        },
        
        'res': {
            'error': '',
            'data': 'User deleted',
        },});
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
