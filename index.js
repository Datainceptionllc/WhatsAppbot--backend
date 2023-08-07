const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./router/api/userRoute');
const customerRoute = require('./router/api/customerRoute');
const whatsAppRoute = require('./router/api/whatsAppRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(userRoute);
app.use(customerRoute);
app.use(whatsAppRoute);

app.listen(4000, () => {
  console.log('running server');
});

// app.post("/login", (req, res) =>{
//     const email = req.body.email;
//     const password = req.body.password;

//     db.query(
//         "SELECT * from users WHERE email = ? AND password = ?",
//         [email, password],
//         (err,result) =>{
//             if (err){
//                 console.log("SOmething is wrong");
//                 res.send({err: err})
//             }
//             if (result.length === 1){
//                 console.log(result);
//                 res.send(result);
//             }else{
//                 console.log("Password Wrong");
//                 res.send({message: "Wrong username/ password... Please try again"});
//             }
//         });
// });

// app.get('/customerData', (req, res) => {
//     const query = 'SELECT * from customers';

//     db.query(query, (error, results) => {
//         if(error) {
//             console.error('Error Executing the query:', error);
//             res.status(500).json({error: 'An error occurred'});
//             return;
//         }
//         res.json(results);
//     });
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//     console.log("File Data:"+req.file);
//     if (!req.file) {
//       res.status(400).json({ error: 'No file uploaded' });
//     } else {
//       // Access the uploaded file using req.file
//       const workbook = reader.readFile(req.file.path);

//   // Do your processing with the workbook here...
//   // For example, you can retrieve data from a specific sheet
//   console.log(workbook.length);
//   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = reader.utils.sheet_to_json(worksheet);
//   console.log("Data:",data, data.length);
//   data.forEach((row) => {
//     console.log("StartDate:",row['StartDate']);
//     const query = 'INSERT INTO customers (insured_name, phone_number, policy_number, NRMR_name, relationship_name, model_number, make, engine_number, chasis_number, SM_Name, Executive_Name, Executive_Number, start_date, end_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//     db.query(query, [row['INSURED_NAME'], row['Mobile Number'], row['POLICYNO'], row['NRMR_Name'], row['RelationshipName'], row['MODEL_NO'], row['MAKE'], row['EngineNo'], row['ChassisNo'], row['SM_Name'], row['Executive Name'], row['Executive Number'], row['StartDate'], row['EndDate']], (err, result) => {
//       if (err) {
//         console.error('Error inserting row:', err);
//         return;
//       }
//       console.log('Row inserted:', result);
//     });
//   });

//       console.log('Uploaded file:', req.file);
//       res.json({ message: 'File uploaded successfully' });
//     }
//   });

//   app.get('/expiredPolicy', (req, res) => {
//     const query =  `
//     SELECT * FROM customers
//     WHERE end_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
//   `;

//     db.query(query, (error, results) => {
//         if(error) {
//             console.error('Error Executing the query:', error);
//             res.status(500).json({error: 'An error occurred'});
//             return;
//         }
//         console.log('Results', results);
//         res.json(results);
//     });
// });

// app.post('/sendNotification', (req, res) => {
//   console.log(req.body.customerData.insured_name);
//   // db.query(
//   //     "SELECT * from users WHERE email = ? AND password = ?",
//   //     [email, password],
//   //     (err,result) =>{
//   //         if (err){
//   //             console.log("SOmething is wrong");
//   //             res.send({err: err})
//   //         }
//   //         if (result.length === 1){
//   //             console.log(result);
//   //             res.send(result);
//   //         }else{
//   //             console.log("Password Wrong");
//   //             res.send({message: "Wrong username/ password... Please try again"});
//   //         }
//   //     });

//   const axios = require('axios');
//   let data = JSON.stringify({
//     messaging_product: 'whatsapp',
//     to: req.body.customerData.phone_number,
//     type: 'template',
//     template: {
//       name: 'renewal_template',
//       language: {
//         code: 'en_US',
//       },
//       components: [
//         {
//           type: 'header',
//           parameters: [
//             {
//               type: 'text',
//               text: req.body.customerData.insured_name,
//             },
//           ],
//         },
//         {
//           type: 'body',
//           parameters: [
//             {
//               type: 'text',
//               text: req.body.customerData.engine_number,
//             },
//             {
//               type: 'text',
//               text: req.body.customerData.end_date,
//             },
//           ],
//         },
//       ],
//     },
//   });

//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://graph.facebook.com/v17.0/103833739477467/messages',
//     headers: {
//       Authorization:
//         'Bearer EAALkV5qUSzEBOxLeETLYxi60JQDamB4gDnNmhREMzN2S7mOzGQBtG7QM9V1YZAHJ0ukVWZAhMPtMdkyJGDhuB7mefFbyjHZA2giRDtWLtR1rVUS2QPJZC5WdHOZB06oNcT4QL1LIZCiYCc8e8KRZAcPIEygwLbjwnZCSBANxXAJlCtPbwYpjfRgVH4aeBWCHZBSwQvbozGjlp4qumMaau1tAGdKZAo9GBqBllaxjgeU3QZD',
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
