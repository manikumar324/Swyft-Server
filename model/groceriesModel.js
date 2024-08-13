const mongoose = require('mongoose');

// Define the user schema
const itemsSchema = new mongoose.Schema({
  
  name:{
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount : {
    type: Number,
    required : true
  }
  ,
  image:{
    type : String,
    required: true
  }
}, {
  timestamps: true,
});

// Create the user model
const Groceries = mongoose.model('Groceries', itemsSchema);

module.exports = Groceries;
