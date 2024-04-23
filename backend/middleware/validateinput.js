
const validator = require('validator');

const inputValidator = async (req, res, next) => {
    
    try {

        console.log('inside inputvalidator');

        const { username, email, phone, password } = req.body;

        if (!validator.isAlpha(username.replace(/\s/g, ''))) {
            return res.json({message:"Invalid name format",ok:0});
        }

        if (!validator.isEmail(email)) {
            return res.json({ message: "Invalid email format", ok: 0 });
        }

        if (!validator.isMobilePhone(phone, 'en-IN')) {
            return res.json({message:'Invalid phone Number',ok:0});
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({message:" Create Strong password",ok:0});
        }

        

       

        console.log('All input are valid');

        next();

        


        
    } catch (error) {

        console.log(error.message);

        return res.status(400).send({ok:0, 'message': error.message });


        
    }

}

module.exports = inputValidator;