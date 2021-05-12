const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
// const port = process.env.PORT || 8000;
const port = 3000;
const app = express();
const Email = require("email-templates");
const Handlebars = require("handlebars");

Handlebars.registerHelper("equals", function (a, b, opts) {
  if (a === b) return opts.fn(this);
  else return opts.inverse(this);
});

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`This project is listening on port ${port}!`)
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jinming9420@gmail.com",
    pass: "rokpjokmrqznywqi",
  },
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
    from: "jinming9420@gmail.com",
  },
  send: true,
  views: {
    options: {
      extension: "hbs",
    },
  },
  transport: transporter,
});

// Emails:  kingsmallstar@outlook.com, jingang718@outlook.com, jin.bestvictoria718@gmail.com

function sendEmail(folderName, data) {
  email
    .send({
      template: folderName,
      message: {
        to: ["jingang718@outlook.com", "jin.bestvictoria718@gmail.com"],
      },
      locals: data,
    })
    .then(console.log)
    .catch(console.error);
}

// const bananaData = require("./emails/Banana/repair_service_config.json");
// const blackappleData = require("./emails/BlackApple/repair_service_config.json");
// const geeboData = require("./emails/Geebo/repair_service_config.json");
// const mobileTechData = require("./emails/MobileTech/repair_service_config.json");
const nanoTechData = require("./emails/Nanotech/repair_service_config.json");
// const northTechData = require("./emails/Northtech/repair_service_config.json");
// const phonephixData = require("./emails/Phonephix/repair_service_config.json");
// const reparaData = require("./emails/Reparation/repair_service_config.json");
// const wirelessData = require("./emails/Wireless/repair_service_config.json");

// const dccmtxData = require("./emails/Dccmtx/repair_service_config.json");

app.get("/send-email", function (req, res) {
  // sendEmail("Banana", bananaData);
  // sendEmail("BlackApple", blackappleData);
  // sendEmail("Geebo", geeboData);
  // sendEmail("MobileTech", mobileTechData);
  sendEmail("Nanotech", nanoTechData);
  // sendEmail("Northtech", northTechData);
  // sendEmail("Phonephix", phonephixData);
  // sendEmail("Reparation", reparaData);
  // sendEmail("Wireless", wirelessData);

  // sendEmail("Dccmtx", dccmtxData);

  res.send("Email was sent successfully!");
});
