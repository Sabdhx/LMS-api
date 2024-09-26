const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userModel = require('../models/authModel.js');
const jwt = require("jsonwebtoken")

const customError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = customError;
const createUser = async (req, res, next) => {
  const { userName, email, password, role } = req.body; // Extract role from req.body

  // Check if role is valid
  if (!role || !['student', 'teacher'].includes(role)) {
    return res.status(400).json({ error: "Invalid or missing role" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Create a new User instance with all required fields
  const newUser = new userModel({
    userName,
    email,
    password: hashedPassword,
    role // Include the role here
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

 
const signIn = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    console.log(userName, password); // Make sure to log the correct variable
    const validUser = await userModel.findOne({ userName });
    
    if (!validUser) {
      return next(customError(401, "Incorrect username or password")); // Use custom error for not found
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(customError(401, "Incorrect username or password")); // Use custom error for password mismatch
    }
    
    const { password: hashedPassword, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, "secret", { expiresIn: "1d" });
    console.log(token);
    
    res.cookie("token", token, {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    }).json(rest);
  } catch (error) {
    next(customError(500, "An error occurred during sign in")); // Catch and handle any unexpected errors
  }
};


 const userVerification = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token,"Secret", {}, async (err, usertoken) => {
      if (err) throw err;
      const { name, email, _id, isAdmin, addresses } = await userModel.findById(
        usertoken.id
      );
      res.json({ name, email, _id, isAdmin, addresses });
    });
  }
};

const userLogout= async(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:"none"
  })
  .send({message:"cookie cleared successfully"})
}

module.exports = {createUser,signIn,userVerification,userLogout}