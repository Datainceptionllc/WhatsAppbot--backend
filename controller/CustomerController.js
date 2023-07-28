const customerModel = require('../model/Customer');
const reader = require('xlsx');

exports.uploadFileContents = async(req, res) => {
    console.log("File Data:"+req.file);
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
    } else {
      // Access the uploaded file using req.file
        const workbook = reader.readFile(req.file.path);

       // console.log(workbook.length);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = reader.utils.sheet_to_json(worksheet);
        console.log("Data:",data, data.length);
        try {
            // Use Promise.all() to wait for all promises to be resolved
            const promises = data.map((row) => customerModel.uploadFileContents(row));
            const uploadContents = await Promise.all(promises);
      
            if (!uploadContents.every(Boolean)) {
              res.status(401).json({ error: 'There was some issue with file upload' });
            } else {
              res.status(200).json({ message: 'File uploaded successfully' });
            }
          } catch (error) {
            res.status(500).json({ error: 'Error during file upload' });
          }
        }
      };

exports.getCustomerData = async (req, res) => {
    try{
        const customerData = await customerModel.getCustomerData();
        console.log("Inside Customer Data");
        res.status(200).json(customerData);
    }catch (error){
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
};

exports.getExpiredPolicyData = async (req, res) => {
    try{
        const customerData = await customerModel.getCustomerData();
        res.status(200).json(customerData);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};


// module.exports = {
//     uploadFileContents,
//     getCustomerData,
//     getExpiredPolicyData
// };