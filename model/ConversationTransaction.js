const db = require('../config/connection');

const uploadFileContents = (row) => {
  console.log('Row', row);
  return new Promise((resolve, reject) => {
    const insertQuery =
      'INSERT INTO conversation_transactions (insured_name, phone_number, policy_number, NRMR_name, relationship_name, model_number, make, engine_number, chasis_number, SM_Name, Executive_Name, Executive_Number, start_date, end_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      insertQuery,
      [
        row['INSURED_NAME'],
        row['Mobile Number'],
        row['POLICYNO'],
        row['NRMR_Name'],
        row['RelationshipName'],
        row['MODEL_NO'],
        row['MAKE'],
        row['EngineNo'],
        row['ChassisNo'],
        row['SM_Name'],
        row['Executive Name'],
        row['Executive Number'],
        row['StartDate'],
        row['EndDate']
      ],
      (err, result) => {
        if (err) {
          reject(err);
          console.log('Something is wrong');
          //res.send({err: err})
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getConversationTransactionData = async () => {
  ///console.log('Email', 'Password', email, password);
  return new Promise((resolve, reject) => {
    db.query('SELECT * from conversation_transactions', (err, result) => {
      if (err) {
        console.log('Error fetching data from sql   ');
        reject(err);

        //res.send({err: err})
      } else {
        console.log('Fetched Customer Data', result);
        resolve(result);
        // res.send({message: "Wrong username/ password... Please try again"});
      }
    });
  });
};

const getMessageStatusWithCustomerDetails = async (phone_number) => {
  const policyQuery =
    'SELECT * FROM conversation_transactions WHERE phone_number=?'; // Replace 'users' with your table name

  return new Promise((resolve, reject) => {
    db.query(policyQuery, [phone_number], (err, result) => {
      if (err) {
        console.log('Error fetching data from sql');
        reject(err);

        //res.send({err: err})
      } else {
        console.log('Fetched Expired Policy Data', result);
        resolve(result);
        // res.send({message: "Wrong username/ password... Please try again"});
      }
    });
  });
};

const updateCustomerDataStatus = async (policy_number) => {
  const policyQuery =
    'UPDATE conversation_transactions set notified =? WHERE policy_number=?'; // Replace 'users' with your table name

  return new Promise((resolve, reject) => {
    db.query(policyQuery, ['Yes', policy_number], (err, result) => {
      if (err) {
        console.log('Error fetching data from sql');
        reject(err);

        //res.send({err: err})
      } else {
        console.log('Fetched Expired Policy Data', result);
        resolve(result);
        // res.send({message: "Wrong username/ password... Please try again"});
      }
    });
  });
};

const updateCustomerRenewalDataStatus = async (policy_number) => {
  const policyQuery =
    'UPDATE conversation_transactions set renewal_requested=? WHERE policy_number=?'; // Replace 'users' with your table name

  return new Promise((resolve, reject) => {
    db.query(policyQuery, ['Yes', policy_number], (err, result) => {
      if (err) {
        console.log('Error fetching data from sql');
        reject(err);

        //res.send({err: err})
      } else {
        console.log('Fetched Expired Policy Data', result);
        resolve(result);
        // res.send({message: "Wrong username/ password... Please try again"});
      }
    });
  });
};

module.exports = {
  uploadFileContents,
  getConversationTransactionData,
  getMessageStatusWithCustomerDetails,
  updateCustomerDataStatus,
  updateCustomerRenewalDataStatus
};
