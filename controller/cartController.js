const CartModel = require("../model/cartModel");

exports.AddTocart = async (req, res) => {
  try {
    const { id, name, price, discount, image, userId, quantity } = req.body;
    console.log(req.body);

    // Find if the item already exists in the cart for the user
    let cartItem = await CartModel.findOne({ id, userId });

    if (cartItem) {
      // Item exists, update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json({ message: "Product quantity updated successfully", cart: cartItem });
    } else {
      // Item does not exist, create a new entry
      const newCartItem = new CartModel({ id, name, price, discount, image, userId, quantity });
      await newCartItem.save();
      res.status(201).json({ message: "Product added to cart successfully", cart: newCartItem });
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred while adding to the cart" });
  }
};

exports.RemoveFromCart = async (req, res) => {
    try {
      const { id, userId, quantity } = req.body;
      console.log(req.body);
  
      let cartItem = await CartModel.findOne({ id, userId });
  
      if (cartItem) {
        if (quantity > 1) {
          // If quantity is greater than 1, reduce it
          cartItem.quantity -= 1; // Decrease by 1
          await cartItem.save();
          res.status(200).json({ message: "Product quantity reduced successfully", cart: cartItem });
        } else {
          // If quantity is 1 or less, remove the item
          await CartModel.deleteOne({ id, userId });
          res.status(200).json({ message: "Product removed from cart successfully" });
        }
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "An error occurred while removing from the cart" });
    }
  };

  exports.deleteCart = async (req, res) => {
    try {
      // Destructure itemId from the request body
      const { itemId } = req.body;
  
      // Log the request body for debugging
      console.log('Request Body:', req.body);
  
      // Check if itemId is provided
      if (!itemId) {
        return res.status(400).json({ message: "Item ID is required" });
      }
  
      // Delete the item from the cart
      const cartItem = await CartModel.findByIdAndDelete(itemId);
  
      // Check if the item was found and deleted
      if (!cartItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Return success response
      res.status(200).json({ message: "Item Removed", cartItem });
    } catch (error) {
      // Log the error and return a server error response
      console.error('Error deleting item:', error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.getcartItems = async(req,res) =>{
    const {userId} = req.body
    const cartItems = await CartModel.find({userId})
    res.status(200).json({cartItems})
    
  }

  exports.getCartLength = async(req,res) =>{
    const {userId} = req.body
    const cartItems = await CartModel.find({userId})
    const length = cartItems.length
    res.status(200).json({Cartlength : length} )  
  }