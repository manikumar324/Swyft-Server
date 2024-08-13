const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
      {
        id: String,
        name: String,
        price: Number,
        discount: Number,
        image: String,
        quantity: Number,
        createdAt: Date,
        updatedAt: Date,
      },
    ],
    orderDate: { type: Date, default: Date.now },
  });

  const Orderdata = mongoose.model("Orders" , orderSchema)
  module.exports = Orderdata