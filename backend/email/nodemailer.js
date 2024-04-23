const User = require("../models/userRegistration");

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'rahul.nitahai@gmail.com',
        pass: 'zcgv jpqy lyed riou'
    }
});

const email = async (req, res) => {
    try {
        console.log('inside email to sent otp');
        const { email } = req.body;
        const user = await User.findOne({ email });
        

        const otp = Math.floor(1000 + Math.random() * 9000);

        const mailOptions = {
            from: 'rahul.nitahai@gmail.com',
            to: email,
            subject: 'OTP for registration',
            text: `Your OTP for registration is ${otp}`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log(error);
               return  res.status(500).send({ok:0,message: 'Error sending OTP' });
            } else {
                console.log('Email sent');
                user.otp = otp;
                await user.save();
               return res.status(200).send({ok:1,message:'OTP SENT TO YOUR MAIL'});
            }
          });




    } catch (error) {

        return res.send({ok:0,message: error.message });
        
    }
}

module.exports = email;