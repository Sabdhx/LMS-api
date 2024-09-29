const express = require("express");
const app = express();
const auth = require("./route/authRoute.js");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const course  = require("./route/courseUplaoding.js");
const courseUpload= require("./route/courseUplaoding.js")
const port = 5000; 




app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

const mongoUri = "mongodb+srv://develper:123@cluster0.6e7f2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); 
  });

 



app.use("/", auth);
app.use("/", course);
app.use("/", courseUpload);
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
