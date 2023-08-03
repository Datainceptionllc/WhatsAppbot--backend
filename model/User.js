const db = require('../config/connection');

const checkLogin = (email, password) => {
  console.log('Email', 'Password', email, password);
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * from users WHERE email = ? AND password = ?',
      [email, password],
      (err, result) => {
        if (err) {
          console.log('SOmething is wrong', err);
          reject(err);

          //res.send({err: err})
        }
        if (result.length === 1) {
          console.log(result);
          //res.send(result);
          resolve(result);
        } else {
          console.log('Password Wrong', result);

          // res.send({message: "Wrong username/ password... Please try again"});
        }
      },
    );
  });
};

const registerUser = (email, password, role) => {
  console.log('Inside Model:', role, email);

  return new Promise((resolve, reject) => {
    registerUserQuery =
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';

    db.query(registerUserQuery, [email, password, role], (err, result) => {
      if (err) {
        console.log('SOmething is wrong', err);
        reject(err);
      } else {
        console.log('User has been reigstered successfully !!!');
        resolve(result);
      }
    });
  });
};

const fetchAdminData = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * from users', (err, result) => {
      if (err) {
        console.log('Error fetching data from sql   ');
        reject(err);

        //res.send({err: err})
      } else {
        console.log('Fetched Users Data', result);
        resolve(result);
        // res.send({message: "Wrong username/ password... Please try again"});
      }
    });
  });
};

const fetchManagerData = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE role IN ('Manager', 'Executive') ",
      (err, result) => {
        if (err) {
          console.log('Error fetching data from sql');
          reject(err);

          //res.send({err: err})
        } else {
          console.log('Fetched Users Data', result);
          resolve(result);
          // res.send({message: "Wrong username/ password... Please try again"});
        }
      },
    );
  });
};

const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users where id=?', [id], (err, result) => {
      if (err) {
        console.log('Error fetching data from sql   ');
        reject(err);
      } else {
        console.log('User Deleted Successfully', result);
        resolve(result);
      }
    });
  });
};
module.exports = {
  checkLogin,
  registerUser,
  fetchAdminData,
  fetchManagerData,
  deleteUser,
};
