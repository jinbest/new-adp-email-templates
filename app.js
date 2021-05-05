const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8000;
const app = express();
const Email = require('email-templates');
const Handlebars = require("handlebars");

const data = require("./data.json")

Handlebars.registerHelper('equals', function (a, b, opts) {
  if (a === b)
    return opts.fn(this);
  else
    return opts.inverse(this);
});

app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`This project is listening on port ${port}!`)
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jinming9420@gmail.com',
    pass: 'rokpjokmrqznywqi'
  }
});

// const transporter = nodemailer.createTransport({
//   service: 'SendGrid',
//   auth: {
//     user: 'SENDGRID_USERNAME',
//     pass: 'SENDGRID_PASSWORD'
//   }
// });

const email = new Email({
  message: {
    from: 'jinming9420@gmail.com'
  },
  send: true,
  views: {
    options: {
      extension: 'hbs'
    }
  },
  transport: transporter
});

function sendEmail(folderName, data) {
  email
    .send({
      template: folderName,
      message: {
        to: ['jin.bestvictoria718@gmail.com', 'eosarhemen@gmail.com'],
      },
      locals: data
    })
    .then(console.log)
    .catch(console.error);
}

app.get('/send-email', function(req, res) {
  sendEmail('MobileTech', data);
  res.send('Email was sent successfully!');
});