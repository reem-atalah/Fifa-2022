const router = require('express').Router();
const jwt = require('jsonwebtoken');

var db = require('../db');

router.get('/', async (req, res) => {

  return res.status(200).json();

});


router.post('/', async (req, res) => {

  const sign_in_Username = req.body.Username;
  const sign_in_Password = req.body.Password;

  if(!sign_in_Username)
  {
    return res.status(401).json("You must enter UserName");
  }
  if(!sign_in_Password)
  {
    return res.status(401).json("You must enter Password");
  }

  var sql_query1 = `SELECT Password from Users where Username = "${sign_in_Username}";`

  try {

    var executed1 = await applyQuery(sql_query1);

    // check if the user exists
    if (executed1.length == 0) {
      // throw "UserName does not exist";
      return res.status(401).json("UserName does not exist");
    }

    // check if the password is correct 
    if (executed1[0].Password != sign_in_Password) {
      // throw "Password is incorrect";
      return res.status(401).json("Password is not correct");
    }

    var sql_query1 = `SELECT * from Users where Username = "${sign_in_Username}";`
    var executed1 = await applyQuery(sql_query1);

    // map the Role to word
    let type = "Fan";
    let type2 = "Fan";
    switch (executed1[0].Role) {
      case "0":
        type = "Admin";
        type2 = "Admin";
        break;
      case "1":
        type = "Manager";
        type2 = "Manager";
        break;
      case "2":
        type = "Fan";
        type2 = "PendingManager";
        break;
      default:
        type = "Fan";
        type2 = "Fan";
    }
    
    const user = executed1[0];

    // token
    const token = jwt.sign({
      username: user["Username"],
      role: type
    },
      process.env.KEY);

    // combine token and username in a json object
    const result = {
      id: user["ID"],
      name: user["Username"],
      email: user["Email"],
      role: type2,
      token: token
    }

    return res.status(200).json(result);
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
        else { 
          reject(new Error(error));
        }
      })
    }, 10);
  });
};

module.exports = router;
