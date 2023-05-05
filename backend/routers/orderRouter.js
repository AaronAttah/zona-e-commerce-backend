import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  // by just defining/calling the 'isAuth' functon as a middleware below 1st t checks if the user is authorized 2ndly the req.user below will be filled with
  //   the user information that was decrypted in the utils.js fle
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      return res.status(400).send({ message: "cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        // user: req.user._id,

        // this user could only be gotten with the aid of the next() at the isAuth functon from the utils.js files but im only getting its ID
        //NB: i had taught im to get the user info that made this order from the userRouter during sign in/ registeration but the exact thing to  do
        // is to get it from the exact user that initiated the transaction how? by using the specific Token generated during signin/registration.
      });
      const createdOrder = await order.save();
      return res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

export default orderRouter;
