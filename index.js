const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./router/api/userRoute');
const customerRoute = require('./router/api/customerRoute');
const whatsAppRoute = require('./router/api/whatsAppRoute');
const conversationTransactionRoute = require('./router/api/conversationTransactionRoute');
require('dotenv').config();

app.get('/', (req, res) => {
  res.status(200).send('hello this is webhook setup');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true // If you're sending cookies
  })
);

app.use(userRoute);
app.use(customerRoute);
app.use(conversationTransactionRoute);
app.use(whatsAppRoute);

app.listen(process.env.PORT, () => {
  console.log('running server');
});
