const Restaurant = require("../controllers/getAllRestaurent");
const express = require("express");
const cors = require("cors");
const {
  userVerification,
  verifyadmin,
  verifyuser,
  verifyowner,
} = require("../middleware/authmiddleware");
const router = express.Router();

router.use(cors());

//Admin
router.post("/deleteRes", verifyadmin, Restaurant.deleteRes);
router.post("/addRes", verifyadmin, Restaurant.addRes);

// Restaurent Owner
router.post("/adddish", verifyowner, Restaurant.addDish);
router.post("/deletedishes", verifyowner, Restaurant.deleteDish);
router.post("/updateOrder", verifyowner, Restaurant.updateOrder);
router.get("/ResOrder", verifyowner, Restaurant.getOrderResdetails);
//auth
router.post("/signup", Restaurant.signup);
router.post("/login", Restaurant.login);
router.post("/auth", verifyuser, Restaurant.verifyUser);
//order
router.get("/allOrder", Restaurant.getAllOrder);
router.post("/sendOrder", Restaurant.sendOrder);
router.get("/userOrder", Restaurant.getOrderdetails);

// All Restaurant Data
router.get("/getAllRes", Restaurant.getAllRes);
// All dishes of a Specific Restaurant
router.get("/getAllDishes/:phone", Restaurant.getAllDishes);

module.exports = router;
