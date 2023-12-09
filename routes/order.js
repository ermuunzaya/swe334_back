const express = require("express");
const Order = require("../modals/order");
const authGuard = require("../middlewares/authGuard");
const Enums = require("../enum");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/user", authGuard, async (req, res) => {
  try {
    const order = await Order.find({user: req.user._id});
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", authGuard, async (req, res) => {
  try {
    const { price } = req.body;

    const products = req.user.cart;
    const user = req.user._id
    const order = await Order.create({
      price: price,
      date: Date.now(),
      method: Enums.BillTypes.QPAY,
      products: products,
      user: user,
      status: Enums.OrderStatus.PROCESSING,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, body);
  res.json(order);
});
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {}
});

module.exports = router;
