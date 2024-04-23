const User = require("../models/userRegistration");
const bcrypt = require("bcryptjs");



// auth
async function verifyUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    } 
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.role, user.name,user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token });
    // res.json(token);
    console.log(user);
  } catch (error) {
    return res.json(error);
  }
}
// signup
async function signup(req,res,next) {
  try {
    const { email, password, username, phone, role, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ok:0 ,message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      phone,
      role,
      createdAt, 
    });

    

    next();

    

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required",ok:0});
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email",ok:0});
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email",ok:0});
    }
    const token = createSecretToken(user._id, user.role, user.name,user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token ,ok:1,message:'Login success'});
    // res.json(token);
    console.log(user);
  } catch (error) {
    return res.json({message:'error occured'});
  }
}

module.exports = {
  signup,
  login,
  verifyUser,
};
