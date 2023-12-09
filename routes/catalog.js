const express = require("express");
const Catalog = require("../modals/catalog");
const router = express.Router();
const authGuard = require("../middlewares/authGuard");
router.get("/", async (req, res) => {
  try {
    const parent = await Catalog.find({
      parent: null,
    });
    const sub = await Catalog.find({
      parent: { $ne: null },
    }).populate("parent", "_id title ", Catalog);
    res.json({
      parent,
      sub,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/product", async (req, res) => {
  try {
    const sub = await Catalog.find({
      parent: { $ne: null },
    }).populate("parent", "_id title ", Catalog);

    res.send(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/parent", async (req, res) => {
  try {
    const catalog = await Catalog.find({
      parent: null,
    });
    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", authGuard, async (req, res) => {
  try {
    let body = req.body;

    const catalog = await Catalog.create(body);
    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authGuard, async (req, res) => {
  const body = req.body;
  const catalog = await Catalog.findByIdAndUpdate(req.params.id, body);
  res.json(catalog);
});
router.get("/get/:id", async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    res.json(catalog);
  } catch (error) {}
});

module.exports = router;
