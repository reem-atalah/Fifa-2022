const router = require('express').Router();

var db = require('../db');

router.get('/', async (req, res) => {

  return res.status(200).json();

});


router.post('/', async (req, res) => {

  const sign_in_Username = req.body.Username;
  const sign_in_Password = req.body.Password;

  var sql_query1 = `SELECT Password from Users where Username = "${sign_in_Username}";`

  try {

    var executed1 = await applyQuery(sql_query1);

    // check if the user exists
    if (executed1.length == 0) {
      // throw "UserName does not exist";
      return res.status(401).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },
  
        'res': {
          'error': 'UserName does not exist',
          'data': '',
        },
      });
    }

    // check if the password is correct 
    if (executed1[0].Password != sign_in_Password) {
      // throw "Password is incorrect";
      return res.status(401).json({
        'meta': {
          'status': 500,
          'msg': 'INTERNAL_SERVER_ERROR',
        },
  
        'res': {
          'error': 'Password is incorrect',
          'data': '',
        },
      });
    }

    global_username = sign_in_Username;
    switch (executed1[0].Role) {
      case 0:
        global_type = "Admin";
        break;
      case 1:
        global_type = "Manager";
        break;
      case 2:
        global_type = "Fan";
        break;
      default:
        global_type = "Fan";
        break;
    }
    console.log(global_type);
    var sql_query1 = `SELECT * from Users where Username = "${sign_in_Username}";`
    var executed1 = await applyQuery(sql_query1);
    console.log(executed1);

    return res.status(200).json(executed1);
  }
  catch (e) {
    console.log(e);
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
