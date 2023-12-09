const express = require("express");
const User = require("../modals/users");
const Product = require("../modals/product");
const router = express.Router();
const authGuard = require("../middlewares/authGuard");
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) res.send(false);
    await User.create(body);
    res.send(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const body = req.body;

    await User.findOne({
      email: body.email,
    }).then((d) => {
      if (d) {
        if (d.password == body.password) {
          const token = d.generateAuthToken();
          res.json(token);
        } else {
          res
            .status(400)
            .json({ message: "И-майл хаяг эсвэл нууц үгээ шалгана уу" });
        }
      } else {
        res.status(400).json({ message: "Бүртгэлгүй байна" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", authGuard, async (req, res) => {
  res.json(req.user);
});
router.get("/id/:id", authGuard, async (req, res) => {
  try {
    return await User.findById(req.params.id);
  } catch (error) {}
});
router.get("/wish", authGuard, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    const products = await Product.find({ _id: { $in: user.wish } });
    res.send(products);
  } catch (error) {}
});
router.get("/cart", authGuard, async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate(
      "cart.id",
      "_id title thumbnail brand code price"
    );
    res.send(user.cart);
  } catch (error) {}
});
router.put("/wish", authGuard, async (req, res) => {
  try {
    const body = req.body;

    return await User.findByIdAndUpdate(req.user._id, {
      wish: body,
    });
  } catch (error) {}
});
router.put("/cart", authGuard, async (req, res) => {
  try {
    const body = req.body;

    return await User.findByIdAndUpdate(req.user._id, {
      cart: body,
    });
  } catch (error) {}
});
router.put("/profile", authGuard, async (req, res) => {
  try {
    const { lastname, firstname, email, phone } = req.body;

    return await User.findByIdAndUpdate(req.user._id, {
      lastname,
      firstname,
      email,
      phone,
    });
  } catch (error) {}
});
router.put("/password", authGuard, async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    let user = await User.findById(req.user._id);
    if (user.password == password) {
      user.password = newPassword;
      await user.save();
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {}
});

module.exports = router;
