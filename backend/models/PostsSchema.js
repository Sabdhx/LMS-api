const mongoose = require("mongoose");
const posts= new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['video', 'pdf', 'image'], required: true }, 
    url: { type: String, required: true },  
    title: { type: String, required: true },  
    uploadedAt: { type: Date, default: Date.now }  
})

const post = mongoose.model('post', posts);

module.exports=post;