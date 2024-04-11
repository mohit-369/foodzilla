const Restaurant = require("../controllers/getAllRestaurent");
const Admin = require("../controllers/admin");
const Owner = require("../controllers/owner");
const User = require("../controllers/user");
const auth = require("../controllers/auth");
const express = require("express");
const cors = require("cors");
const {
  verifyadmin,
  verifyuser,
  verifyowner,
} = require("../middleware/authmiddleware");
const router = express.Router();

router.use(cors());

//Admin
router.post("/deleteRes", verifyadmin, Admin.deleteRes);
router.post("/addRes", verifyadmin, Admin.addRes);

// Restaurent Owner
router.post("/adddish", verifyowner, Owner.addDish);
router.post("/deletedishes", verifyowner, Owner.deleteDish);
router.post("/updateOrder", verifyowner, Owner.updateOrder);
router.get("/ResOrder", verifyowner, Owner.getOrderResdetails);
//auth
router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/auth", verifyuser, auth.verifyUser);
//User
router.get("/allOrder", verifyuser, User.getAllOrder);
router.post("/sendOrder", verifyuser, User.sendOrder);
router.get("/userOrder", verifyuser, User.getOrderdetails);
// any one can view
// All Restaurant Data
router.get("/getAllRes", User.getAllRes);
// All dishes of a Specific Restaurant
router.get("/getAllDishes/:phone", User.getAllDishes);

module.exports = router;
