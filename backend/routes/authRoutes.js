const express= require("express");
const {signup, login,google, verifyUser,updateUser,deleteUser,signout}= require("../middlewares/authMiddlewares.js");

const router= express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google)
router.post("/update/:id", verifyUser, updateUser);
router.get("/delete/:id", verifyUser, deleteUser)
router.get("/signout",signout)

module.exports= router;