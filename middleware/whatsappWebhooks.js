require('dotenv').config();
const axios = require('axios');
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN; //prasath_token

const thankYouMessgae = (from) => {
  console.log('Inside thank you message');
  let data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: from,
    type: 'template',
    template: {
      name: 'thank_you_template',
      language: {
        code: 'en_US',
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graph.facebook.com/v17.0/103833739477467/messages',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer EAALkV5qUSzEBOxLeETLYxi60JQDamB4gDnNmhREMzN2S7mOzGQBtG7QM9V1YZAHJ0ukVWZAhMPtMdkyJGDhuB7mefFbyjHZA2giRDtWLtR1rVUS2QPJZC5WdHOZB06oNcT4QL1LIZCiYCc8e8KRZAcPIEygwLbjwnZCSBANxXAJlCtPbwYpjfRgVH4aeBWCHZBSwQvbozGjlp4qumMaau1tAGdKZAo9GBqBllaxjgeU3QZD',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.webhookVerify = (req, res) => {
  let mode = req.query['hub.mode'];
  let challange = req.query['hub.challenge'];
  let token = req.query['hub.verify_token'];

  if (mode && token) {
    if (mode === 'subscribe' && token === mytoken) {
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
};

exports.receiveReplyHook = (req, res) => {
  console.log('Datainception webhook:', req.body);
  let body_param = req.body;

  console.log(JSON.stringify(body_param, null, 2));

  if (body_param.object) {
    console.log('inside body param');
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body =
        body_param.entry[0].changes[0].value.messages[0].button.text;
      let customer_phone_number =
        body_param.entry[0].changes[0].value.contacts[0].wa_id;

      console.log('phone number ' + phon_no_id);
      console.log('from ' + from);
      console.log('boady param ' + msg_body);
      console.log('customer phone number param ' + customer_phone_number);
      if (msg_body === 'Yes') {
        thankYouMessgae(customer_phone_number);
      }
    }
  }
};

exports.sendTemplateToCustomers = (req, res) => {
  let data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: req.body.customerData.phone_number,
    type: 'template',
    template: {
      name: 'renewal_template',
      language: {
        code: 'en_US',
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'text',
              text: req.body.customerData.insured_name,
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: req.body.customerData.engine_number,
            },
            {
              type: 'text',
              text: req.body.customerData.end_date,
            },
          ],
        },
      ],
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graph.facebook.com/v17.0/103833739477467/messages',
    headers: {
      Authorization: 'Bearer' + ' ' + process.env.TOKEN,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
