const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const GroceryCntrller = require("../controller/groceriesController")
const cartController = require('../controller/cartController')
const OrderCntrl = require('../controller/orderController')

router.post("/signup",userController.createUser)
router.post("/signIn",userController.loginUser)
router.post("/addItems",GroceryCntrller.AddItems)
router.get("/items",GroceryCntrller.getItems)
router.post("/addTocart",cartController.AddTocart)
router.post("/remove",cartController.RemoveFromCart)
router.delete("/removefromcart",cartController.deleteCart)
router.post('/cart',cartController.getcartItems)
router.post("/length",cartController.getCartLength)
router.post("/forgot-password",userController.updatePassword)
router.post("/AddOrders",OrderCntrl.AddOrders)
router.post("/orders",OrderCntrl.getOrders)


module.exports = router ;