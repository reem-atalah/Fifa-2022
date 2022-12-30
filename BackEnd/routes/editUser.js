const router = require('express').Router();
const isAuthorized = require('../Configurations//isAuthorized');
const allEndpoints=require('./endpoints');
var db = require('../db');


router.put('/:Username', isAuthorized(allEndpoints.fan),async (req, res) => {
    var firstname= req.body.FirstName ;
    var lastname= req.body.LastName ;
    var oldUsername= req.params.Username;
    var newUsername= req.body.Username;
    var email=req.body.Email;
    var pass=req.body.Password;
    var birthdate=req.body.Birthdate;
    var gender = req.body.Gender;
    var nationality = req.body.Nationality;
    var role = req.body.Role;

    // get the user, then update it once
    query= `SELECT * FROM Users where Username ='${oldUsername}'`;
    sql =await applyQuery(query);
    // if user doesn't exist
    if(!sql)
    {
      return res.status(200).json("User doesn't exist");
    }

    // check for role
    if(!role)
    {
      role = sql[0]['Role']
    }
    else if (role === '0' && sql[0]['Role'] !== '0') {
      return res.status(401).json('You are not allowed to be an IT Administrator');
    }
    else if (role === '1') { // fan wants to be manager
      role = 2
    }

    // handle nullity of user input for not changing those inputs
 
    if(email)
    {
      let email_sql = `select * from Users where Email = "${email}" and Username != '${oldUsername}'`;
      let executed = await applyQuery(email_sql);

      if(executed.length != 0)
      {
        return res.json("This email is already in use")
      }
    }
    
    // // update password and hash it

    // update username at the end , then update the token 
    if(newUsername != oldUsername)
    {
      let username_sql = `select * from Users where Username = "${newUsername}"`;
      let executed = await applyQuery(username_sql);
      if(executed.length != 0)
      {
        return res.json("This username is already in use")
      }
    }

    // query= `UPDATE Users set FirstName ="${firstname}",LastName = "${lastname}", Email ="${email}", Password ="${pass}" , BirthDate=${birthdate},Gender =${gender}, Nationality="${nationality}", UserName ="${newUsername}" ,Role = ${role}  where UserName ="${oldUsername}";`;
    // update query
  var sql_query = `UPDATE Users SET `;

  if (firstname) {
    sql_query += `FirstName = "${firstname}", `;
  }
  if (lastname) {
    sql_query += `LastName = "${lastname}", `;
  }
  if (email) {
    sql_query += `Email = "${email}", `;
  }
  if (pass) {
    sql_query += `Password = "${pass}", `;
  }
  if (birthdate) {
    sql_query += `BirthDate = "${birthdate}", `;
  }
  if (gender) {
    sql_query += `Gender = "${gender}", `;
  }
  if (nationality) {
    sql_query += `Nationality = "${nationality}", `;
  }
  if (newUsername) {
    sql_query += `UserName = "${newUsername}", `;
  }
  if (role) {
    sql_query += `Role = "${role}", `;
  }

  if (sql_query.endsWith(', ')) {
    sql_query = sql_query.slice(0, -2);
    sql_query += ` WHERE UserName ="${oldUsername}";`;
  }
    let excute_update = await applyQuery(sql_query);
    if(newUsername)
    {
      oldUsername = newUsername
    }

    if(excute_update) 
    {
      let print_query = `select * from Users where UserName ="${oldUsername}";`;
      let excute_print_query = await applyQuery(print_query);
      
      return res.status(200).json('User updated');  
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
