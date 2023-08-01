const db = require('../config/connection');

const checkLogin = (email, password) => {
    console.log('Email', 'Password', email, password);
    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * from users WHERE email = ? AND password = ?",
            [email, password],
            (err,result) =>{
                if (err){
                    console.log("SOmething is wrong", err);
                    reject(err);
                    
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


const registerUser = (email, password, role) => {
    console.log("Inside Model:", role, email);

    return new Promise((resolve, reject) => {
        registerUserQuery = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

        db.query(
            registerUserQuery, [email, password, role],
            (err, result) =>{
                if (err){
                    console.log("SOmething is wrong", err);
                    reject(err);
                }else{
                    console.log("User has been reigstered successfully !!!");
                    resolve(result);
                }
            });
    });
};


module.exports = {
    checkLogin,
    registerUser,
  };