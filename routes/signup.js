const router = require('express').Router();

var db = require('../db');

// render the signup page
router.get('/', async (req, res) => { 
        return res.render('signup', {
            title: 'signup',
            css:'login' 
        }); 
});    
 
router.post('/',async (req, res) => { 
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Username = req.body.Username;
    var Password = req.body.Password;
    var Email = req.body.Email;
    const Birthdate = req.body.Birthdate;
    const Gender = req.body.Gender; 
    const Nationality = req.body.Nationality; 
    const Role = req.body.Role; 
    // accept the role by the administrator to be manager or still fan

    //initialize Role with 0(Fan) --> may be updated by the admin if the user is a manager and admin approves
    var sql_query=`INSERT INTO User (Fname ,Lname ,Password ,Email ,Username ,Gender ,Nationality ,Birthdate, Role,manager) VALUES ("${FirstName}","${LastName}","${Password}" ,"${Email}" ,"${Username}","${Gender}", "${Nationality}" , "${Birthdate}",0,${Role});`

    // need to hash the password
    var sql_query1 = `SELECT Password from User where Username = "${Username}";`

    try{ 
        var executed1 = await applyQuery(sql_query1);

        //if the username is arleady in use, must change it
        if (executed1.length == 0)
        {
            var executed = await applyQuery(sql_query);
            if (executed) 
            {
                var sql_query1 = `SELECT * from User where Username = "${Username}";`
                var executed1 = await applyQuery(sql_query1);
                console.log(executed1);

                return res.render('login', {
                    title: 'login',
                    css:'login'
                })
            }
        }
        else
        {
            return res.render('signup', {
                title: 'signup', 
                css:'signup',    
                message: "Choose another UserName"
            });

        }
    }
    catch(e)
        {
            return res.render('signup', {
                title: 'signup',
                css:'signup',    
                message: "Choose another UserName"
            });
    }    
}
);
const applyQuery = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {                           
                        resolve(rows);
                      }
                    else
                     {reject(new Error(error));}
               })     
        }, 10);
    });
};

module.exports = router;