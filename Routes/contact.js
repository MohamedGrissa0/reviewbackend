const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
 
  auth: {
    user: 'chebaaneismail@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD
  }
});

router.post('/contact', (req, res) => {
  const { email, message, subject } = req.body;
  console.log('Received contact form submission:', email, subject, message);

 
  const mailOptions = {
    from:email ,
    to: "chebaaneismail@gmail.com",
    subject: subject,
    text: `Email: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending message');
    } else {
      console.log(`Message sent: ${info.response}`);
      res.send('Message sent successfully');
    }
  });
});

module.exports = router;
