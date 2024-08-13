const Order=require('../model/orderModel');

exports.AddOrders = async(req,res) =>{
    try {
        const { userId, cartItems } = req.body;
        const newOrder = new Order({
          userId,
          cartItems,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
      } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ error: 'Failed to add order' });
      }
}


exports.getOrders = async(req,res) =>{
    const{userId} = req.body
    try {
        const orders = await Order.find({userId:userId})
        res.status(200).json(orders);
    }
    catch(e){
        console.log(e);
    }
}