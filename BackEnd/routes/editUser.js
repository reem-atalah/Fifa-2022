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

    var query= "UPDATE Users set FirstName ='" + firstname +"' where Username ='"+global_username+"'";
    await applyQuery(query);
    query= "UPDATE Users set LastName ='" + lastname +"' where Username ='"+global_username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Username ='" + username +"' where Username ='"+global_username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Email ='" + email +"' where Username ='"+username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Password ='" + pass +"' where Username ='"+username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Birthdate ='" + birthdate +"' where Username ='"+username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Gender ='" + gender +"' where Username ='"+username+"'";
    await applyQuery(query);
    query= "UPDATE Users set Nationality ='" + nationality +"' where Username ='"+username+"'";
    await applyQuery(query);
    global_username=username;
    query= "SELECT * FROM Users where Username ='"+username+"'";
    sql =await applyQuery(query);

    return res.status(200).json({
        'meta': {
            'status': 200,
            'msg': 'OK',
        },
        
        'res': {
            'error': '',
            'data': 'User updated',
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
