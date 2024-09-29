const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userModel = require('../models/authModel.js');
const jwt = require("jsonwebtoken")
const studentSchema = require("../models/studentSchema.js")
const adminModel = require("../models/adminSchema.js")
const customError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = customError;
const createUser = async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  console.log(role)
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    let newUser;      
    if (role === 'admin') {
      newUser =await adminModel({
        userName,
        email,
        password: hashedPassword,
        role
      });
    } else {
      
      newUser = new studentSchema({
        userName,
        email,
        password: hashedPassword,
        role
      });
    }

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', role });
  } catch (error) {
    next(error);
  }
};

 
const signIn = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    console.log(userName, password);
    const validUser = await userModel.findOne({ userName });
    
    if (!validUser) {
      return next(customError(401, "Incorrect username or password")); 
    }
    
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(customError(401, "Incorrect username or password"));
    }
    
    const { password: hashedPassword, ...rest } = validUser._doc;
    
    const token = jwt.sign({ id: validUser._id }, "secret", { expiresIn: "1d" });
    console.log(token);
    
    res.cookie("token", token, {
      sameSite: "None",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({
      userName: validUser.userName,
      role: validUser.role,
      email: validUser.email
    });
  } catch (error) {
    next(customError(500, "An error occurred during sign in")); 
  }
};


 const userVerification = (req, res) => {
  const { token } = req.cookies;
  console.log(token)
  if (token) {
    jwt.verify(token,"secret", {}, async (err, usertoken) => {
      if (err) throw err;
      const { userName, email, _id, role } = await userModel.findById(
        usertoken.id
      );
      res.json({ userName, email, _id, role });
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

const allUsers=async(req,res)=>{
  const reponse = await userModel.find()
  res.json(reponse)
}

const DeleteUser = async(req,res)=>{
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  res.json({message:"deleted"})
}

const studentFind=async(req,res)=>{
  const find = await studentSchema.find();
  res.status(200).json({message:find})
}

module.exports = {createUser,signIn,userVerification,userLogout,allUsers,DeleteUser,studentFind}