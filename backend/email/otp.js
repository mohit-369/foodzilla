const createSecretToken = require("../controllers/cookies");
const User = require("../models/userRegistration");
const OTP = async (req, res) => {
    try {
        const { otp } = req.body;

        const user = await User.findOne({ otp });

        if (!user) {
            return res.send({ message: "Invalid OTP", ok: 0 });
        }

        user.otp = "undefined";

        await user.save();

        console.log("role", user.role);
        const token = createSecretToken(
            user._id,
            user.role,
            user.username,
            user.phone
        );
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        return res
            .status(201)
            .json({ user, token, ok: 1, message: "User Created" });
    } catch (error) {
        return res.send({ message: error.message });
    }
};

module.exports = OTP;
