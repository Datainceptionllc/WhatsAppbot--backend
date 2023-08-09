const userModel = require('../model/User');

exports.checkLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('Email and Pass', email, password, req.body);
  const userPassword = await userModel.checkLogin(email, password);
  console.log('UserPassword', userPassword);
  if (!userPassword) {
    res.status(401).json({ error: 'Invalid Credentials' });
  } else {
    res.status(200).json({ message: 'Login successful', userPassword });
  }
};

exports.registerUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  console.log('Email and Pass', email, password, role);
  const userRegistered = await userModel.registerUser(email, password, role);
  console.log('UserRegisteredDetails', userRegistered);
  if (!userRegistered) {
    res.status(401).json({ error: 'Issue with adding the user' });
  } else {
    res.status(200).json({ message: 'Registered successful', userRegistered });
  }
};

exports.fetchAdminData = async (req, res) => {
  try {
    const adminData = await userModel.fetchAdminData();
    console.log('Inside Admin Data');
    res.status(200).json(adminData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.fetchManagerData = async (req, res) => {
  try {
    console.log('Inside Manager Data');
    const managerData = await userModel.fetchManagerData();
    console.log(managerData);
    res.status(200).json(managerData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log('Id', req.body, id);
  const deleteUser = await userModel.deleteUser(id);
  console.log('Delete User', deleteUser);
  if (!deleteUser) {
    res.status(500).json({ error: 'Issue with adding the user' });
  } else {
    res.status(200).json({ message: 'Registered successful', deleteUser });
  }
};

exports.getUserData = async (req, res) => {
  const email = req.query.email;
  console.log('EMail', email);
  const userData = await userModel.getUserData(email);

  if (!userData) {
    res.status(500).json({ error: 'Issue fetching user data' });
  } else {
    res
      .status(200)
      .json({ message: 'User Details Fetched successfully', userData });
  }
};

exports.updateProfileDetails = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const state = req.body.state;
  const city = req.body.city;
  const zipCode = req.body.zipCode;

  console.log(
    'All Data',
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
    state,
    city,
    zipCode
  );
  const updateUserDetails = await userModel.updateProfileDetails(
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
    state,
    city,
    zipCode
  );
  console.log('Updated User Details are', updateUserDetails);
  if (!updateUserDetails) {
    res.status(401).json({ error: 'Issue updating the profile details' });
  } else {
    res
      .status(200)
      .json({ message: 'Updated all details successful', updateUserDetails });
  }
};
