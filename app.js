const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8000;
const app = express();
const Email = require('email-templates');
const Handlebars = require("handlebars");

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
        to: ['jin.bestvictoria718@gmail.com'],
      },
      locals: data
    })
    .then(console.log)
    .catch(console.error);
}


// const mobileTechData = require("./emails/MobileTech/data.json")
// const nanoTechData = require("./emails/Nanotech/data.json")
// const northTechData = require("./emails/Northtech/data.json")
// const phonephixData = require("./emails/Phonephix/data.json")
// const wirelessData = require("./emails/Wireless/data.json")
// const geeboData = require("./emails/Geebo/data.json")
// const bananaData = require("./emails/Banana/data.json")
const reparaData = require("./emails/Reparation/data.json")

app.get('/send-email', function(req, res) {
  
  // sendEmail('MobileTech', mobileTechData);
  // sendEmail('Nanotech', nanoTechData);
  // sendEmail('Northtech', northTechData);
  // sendEmail('Phonephix', phonephixData);
  // sendEmail('Wireless', wirelessData);
  // sendEmail('Geebo', geeboData);
  // sendEmail('Banana', bananaData);
  sendEmail('Reparation', reparaData);

  res.send('Email was sent successfully!');
});