const router = require('express').Router();

var db = require('../db');

// render the signup page
router.get('/', async (req, res) => {

  console.log('get');

  return res.render('signup', {
    title: 'signup',
    css: 'login'
  });
});

router.post('/', async (req, res) => {


  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Username = req.body.Username;
  var Password = req.body.Password;
  var Email = req.body.Email;
  var Birthdate = req.body.Birthdate;
  var Gender = req.body.Gender;
  var Nationality = req.body.Nationality;
  var Role = req.body.Role;

  console.log('Posting to Signup');
  console.log(`Data: ${FirstName}, ${LastName}, ${Username}, ${Password}, ${Email},\
         ${Birthdate}, ${Gender}, ${Nationality}, ${Role}`);

  // Role: 0 -> Website Admin -> PROHIBTED
  // Role: 1 -> Manager -> Chaneged to 2
  // Role: 2 -> Fan who wants management -> allowed
  // Role: 3 -> Fan -> allowed

  var sql_query = `INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role) \
       VALUES ("${Username}", "${FirstName}", "${LastName}", "${Email}", "${Birthdate}", "${Gender}", "${Password}", "${Nationality}", ${Role});`

  // need to hash the password
  var sql_query1 = `SELECT Password from Users where Username = "${Username}";`

  try {
    if (Role === '0') {
      throw "You are not allowed to register as an IT Administrator";
    }
    else if (Role === '1') {
      Role = 2
    }
    var executed1 = await applyQuery(sql_query1);

    //if the username is arleady in use, must change it
    if (executed1.length != 0) {
      throw "Username is already in use";
    }

    var executed = await applyQuery(sql_query);
    if (executed) {
      var sql_query1 = `SELECT * from Users where Username = "${Username}";`
      var executed1 = await applyQuery(sql_query1);
      console.log(executed1);

      return res.render('login', {
        title: 'login',
        css: 'login'
      })
    }
  }
  catch (e) {
    console.log(e)
    return res.status(401).send(e);
    // return res.render('signup', {
    //     title: 'signup',
    //     css:'signup',    
    //     message: e.message
    // });
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
