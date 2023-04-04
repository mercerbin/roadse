import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const password = process.env.PASS;

const mail = (email, code, subject, message) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akshay04_2023@cmscollege.ac.in',
      pass: `${password}`
    }
  });

  if (message) {
    var mailOptions = {
      from: 'busone@gmail.com',
      to: email,
      subject: `${subject}`,
      text: `${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: to ${email} Successfully`);
      }
    });
  } else {

    var mailOptions = {
      from: 'busone@gmail.com',
      to: email,
      subject: 'Confirmation Code',
      text: `Here is your confirmation Code,  ${code}  .Please use this code to Verify`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: to ${email} Successfully`);
      }
    });
  }

}

export default mail;