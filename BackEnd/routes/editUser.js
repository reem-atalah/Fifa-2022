const router = require('express').Router();

var db = require('../db');


router.post('/', async (req, res) => {

    var firstname= req.body.FirstName ;
    var lastname= req.body.LastName ;
    var username= req.body.Username;
    var email=req.body.Email;
    var pass=req.body.Password;
    var birthdate=req.body.Birthdate;
    var gender = req.body.Gender;
    var nationality = req.body.Nationality;

    // get the user, then update it once
    query= "SELECT * FROM Users where Username ='"+global_username+"'";
    sql =await applyQuery(query);

    // if user doesn't exist
    if(!sql)
    {
      return res.status(200).json("User doesn't exist");
    }

    // handle nullity of user input for not changing those inputs
    if(!username)
    {
      username = sql[0]['Username']
    }
    if(!firstname)
    {
      firstname = sql[0]['FirstName']
    }
    if(!lastname)
    {
      lastname = sql[0]['LastName']
    }
    if(!email)
    {
      email = sql[0]['Email']
    }
    else{// update email and it should be valid
      let email_sql = `select * from Users where email = ${email}`;
    }
    if(!pass)
    {
      pass = sql[0]['Password']
    }
    if(!birthdate)
    {
      birthdate = sql[0]['BirthDate']
    }
    if(!gender)
    {
      gender = sql[0]['Gender']
    }
    if(!nationality)
    {
      nationality = sql[0]['Nationality']
    }
    
    // update password and hash it

    // update username at the end , then update the token (global_username)
    query= "UPDATE Users set Username ='" + username +"' where Username ='"+global_username+"'";
    await applyQuery(query);
    global_username=username;
    

    return res.status(200).json('User updated');

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
