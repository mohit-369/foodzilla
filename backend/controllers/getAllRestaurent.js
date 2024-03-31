const Model = require("../models/schema");
const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");
const User = require("../models/userRegistration");
const bcrypt = require("bcryptjs");
const createSecretToken = require("./cookies");
const schema = require("../models/schema");
async function getAllRes(req, res) {
  try {
    // const { input } = req.query;
    const data = await Model.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllDishes(req, res) {
  try {
    const { phone } = req.params;
    // const { input } = req.query;
    const data = await Modeldish.find({ ph: phone });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllOrder(req, res) {
  try {
    // const { input } = req.query;
    const data = await orderData.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderResdetails(req, res) {
  try {
    const data = await orderData.find({ accept: false });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderdetails(req, res) {
  try {
    const data = await orderData.find({ accept: true });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
    const token = createSecretToken(user._id, user.role, user.name);
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
async function signup(req, res) {
  try {
    const { email, password, username, phone, role, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      phone,
      role,
      createdAt,
    });
    console.log("role", user.role);
    const token = createSecretToken(user._id, user.role, user.username);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// login
async function login(req, res) {
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
    const token = createSecretToken(user._id, user.role, user.name);
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

// Order
async function updateOrder(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // const { input } = req.query;
    req.body.map(async (items) => {
      // console.log(items);
      await orderData.updateOne(
        { ph: items.ph },
        {
          $set: {
            accept: items.accept,
          },
        }
      );
    });
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function sendOrder(req, res) {
  try {
    // Assuming req.body is an array of objects
    res.setHeader("Access-Control-Allow-Origin", "*");
    const dataToSave = await Promise.all(
      req.body.map(async (item) => {
        const data = new orderData({
          dishName: item.dishName,
          dishPrice: item.dishPrice,
          ph: item.ph,
          quantity: item.quantity,
        });

        return await data.save();
      })
    );
    console.log("dataTsave: ", dataToSave);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteDish(req, res) {
  console.log(req.body);
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Assuming req.body is an array of items
    req.body.map(async (item) => {
      if (item.selected === true) {
        await Modeldish.deleteOne({ _id: item._id }); // Assuming each item has an _id field
      }
    });
    res.status(200).json({ message: "Dishes deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

// Restaurent
async function addDish(req, res) {
  const data = new Modeldish({
    dishName: req.body.dishName,
    dishPrice: req.body.dishPrice,
    ph: req.body.ph,
  });
  await data.save();
  res.status(200).json("Dish added succesfully");
}

// Admin

async function deleteRes(req, res) {
  try {
    // Assuming req.body is an array of items
    for (const item of req.body) {
      if (item.selected === true) {
        await schema.deleteOne({ _id: item._id }); // Assuming each item has an _id field
      }
    }
    for (const item of req.body) {
      if (item.selected === true) {
        await Modeldish.deleteMany({ ph: item.ph }); // Assuming each item has an _id field
      }
    }

    res.status(200).json({ message: "Restaurent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// add Restaurent

async function addRes(req, res) {
  try {
    const data = new schema({
      name: req.body.name,
      owner: req.body.owner,
      phone: req.body.phone,
    });
    await data.save();
    res.status(200).json("Restaurent added succesfully");
  } catch (error) {
    res.json({ message: error });
  }
}
module.exports = {
  getAllDishes,
  sendOrder,
  getAllRes,
  getAllOrder,
  updateOrder,
  signup,
  login,
  getOrderdetails,
  getOrderResdetails,
  deleteDish,
  addDish,
  deleteRes,
  addRes,
  verifyUser,
};
