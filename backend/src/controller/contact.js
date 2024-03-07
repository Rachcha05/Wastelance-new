const env = require("dotenv");
env.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//sending email

exports.sendEmail = (req, res) => {
  const { name, email, msg} = req.body;
  const Obj = {
    to: 'kracshan05@gmail.com', // The recipient's email address
    from: 'kracshan05@gmail.com',  // Your verified sender email address in SendGrid
    subject: 'CleanTech',
    text: 'Hello from Cleantech!',
    html: `<h3>Name: ${name}</h3> </br>
    <h3>Email: ${email}</h3> </br>
    <h3>Message: ${msg}</h3> </br>
    `,
      };
  
  sgMail
  .send(Obj)
  .then(() => res.status(200).json({ res: "Success!" }))
  .catch((err) =>res.status(500).json({ error: err.message }));
}

















