const db = require('../config/connection');

const checkLogin = (email, password) => {
    console.log('Email', 'Password', email, password);
    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * from users WHERE email = ? AND password = ?",
            [email, password],
            (err,result) =>{
                if (err){
                    reject(err);
                    console.log("SOmething is wrong");
                    //res.send({err: err})
                }
                if (result.length === 1){
                    console.log(result);
                    //res.send(result);
                    resolve(result);
                }else{
                    console.log("Password Wrong",result);
                    
                   // res.send({message: "Wrong username/ password... Please try again"});
                }
            });

    });

};


module.exports = {
    checkLogin
  };