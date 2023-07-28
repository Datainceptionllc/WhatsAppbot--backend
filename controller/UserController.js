const userModel = require('../model/User');


exports.checkLogin = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('Email and Pass', email, password, req.body);
    const userPassword = await userModel.checkLogin(email, password);
    console.log('UserPassword', userPassword);
    if(!userPassword) {
        res.status(401).json({error: 'Invalid Credentials'});
    }else{
        res.status(200).json({ message: 'Login successful', userPassword });
    }
};


  
  
  