import express from "express";
// import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
// import placeorderRouter from "./routers/placeorderRouter.js";
import orderRouter from "./routers/orderRouter.js";
mongoose.set('strictQuery', true)
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


// error catcher middleware, it catches errors and sends them to the frontend for proper evaluation
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(express.json({ limit: "50mb", exended: true }));
app.use(express.urlencoded({ extended: true,  limit: "50mb"}));
const URI = process.env.MONGODB_URL 
// mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/debarron", {
  mongoose.connect("mongodb+srv://devtest-db:password123_4@devtest-db.zx4g9a6.mongodb.net/devtest-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});


const db = mongoose.connection;
db.once("open", () => {
  console.log("debarronDB connected Successfully");
});

// app.get("/api/products/:id", (req, res) => {
//   // const product = data.products[req.params.id]
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.status(200).send(product);
//   } else {
//     res.status(404).send({ message: "Product not found" });
//   }
// });

// app.get("/api/products", async (req, res) => {
//   res.send(data.products);
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}...`);
});

  

