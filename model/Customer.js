const db = require('../config/connection');

const uploadFileContents = (row) => {
    console.log('Row', row);
    return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO customers (insured_name, phone_number, policy_number, NRMR_name, relationship_name, model_number, make, engine_number, chasis_number, SM_Name, Executive_Name, Executive_Number, start_date, end_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
            insertQuery,
            [row['INSURED_NAME'], row['Mobile Number'], row['POLICYNO'], row['NRMR_Name'], row['RelationshipName'], row['MODEL_NO'], row['MAKE'], row['EngineNo'], row['ChassisNo'], row['SM_Name'], row['Executive Name'], row['Executive Number'], row['StartDate'], row['EndDate']],
            (err,result) =>{
                if (err){
                    reject(err);
                    console.log("Something is wrong");
                    //res.send({err: err})
                }else{
                    resolve(result);
                }
            });

    });

};


const getCustomerData = async () => {
    ///console.log('Email', 'Password', email, password);
    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * from customers",
            (err,result) =>{
                if (err){
                    reject(err);
                    console.log("Error fetching data from sql   ");
                    //res.send({err: err})
                }else{
                    console.log("Fetched Customer Data",result);
                    resolve(result)
                   // res.send({message: "Wrong username/ password... Please try again"});
                }
            });

    });
  };

const getExpiredPolicyData = async () => {
    const expiredPolicyQuery = 'SELECT * FROM customers WHERE end_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()'; // Replace 'users' with your table name

    return new Promise((resolve, reject) => {

        db.query(
            expiredPolicyQuery,
            (err,result) =>{
                if (err){
                    reject(err);
                    console.log("Error fetching data from sql");
                    //res.send({err: err})
                }else{
                    console.log("Fetched Expired Policy Data",result);
                    resolve(result)
                   // res.send({message: "Wrong username/ password... Please try again"});
                }
            });

    });
  };


module.exports = {
    uploadFileContents,
    getCustomerData,
    getExpiredPolicyData
  };