const User = require("../db/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errorMiddleware.js");
require("dotenv").config();

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.send(409).json({
      message: "User already exists, Please Log in",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.status(200).json({
      message: "User Signed Up, Go ahead Login",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("secret", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.send(401).json({
      message: "Unauthorized access!",
    });
  }

  if (
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }

      req.user = user;
      next();
    })
  );
};

const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "Unauthorized access"));
  }

  req.body.password =
    bcrypt.hashSync(req.body.password, 10) || existingUser.password;

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const {password:pass, ...rest}= updated;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



const deleteUser=async(req,res,next)=>{
  if(req.user.id!=req.params.id){
    return next(errorHandler(401,"Unauthorized Access!"));
  }

  try{
    await User.deleteOne({_id:req.user.id});

    res.status(200).json({message:"User deleted"});
  }catch(error){
    next(error);
  }

}



const signout=async(req,res,next)=>{
  res.clearCookie("access_token").status(200).json({message:"User logged out"});
}




module.exports = {
  signup,
  login,
  google,
  verifyUser,
  updateUser,
  deleteUser,
  signout
};
