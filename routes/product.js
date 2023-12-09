const express = require("express");
const Product = require("../modals/product");
const Catalog = require("../modals/catalog");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/catalog", async (req, res) => {
  try {
    const { id, page, limit } = req.body;

    let catalog = await Catalog.findById(id);
    if (catalog.parent == undefined) {
      catalog = await Catalog.find({ parent: catalog });
    }
    const product = await Product.find({
      catalog: { $in: catalog.length > 1 ? catalog : [catalog] },
    })
      .limit(limit)
      .skip(limit * page);
    const count = await Product.find({
      catalog: { $in: catalog.length > 1 ? catalog : [catalog] },
    }).countDocuments();
    res.json({
      data: product,
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/filter", async (req, res) => {
  try {
    const { id, page, limit, filter, value } = req.body;
    let catalog = await Catalog.findById(id);
    if (catalog.parent == undefined) {
      catalog = await Catalog.find({ parent: catalog });
    }
    const product = await Product.find({
      catalog: { $in: catalog.length > 1 ? catalog : [catalog] },
    })
      .limit(limit)
      .skip(limit * page)
      .sort({
        [filter]: value,
      });
    const count = await Product.find({
      catalog: { $in: catalog.length > 1 ? catalog : [catalog] },
    }).countDocuments();
    res.json({
      data: product,
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const product = await Product.create({ ...body, count: 0 });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const body = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, body);
  res.json(product);
});
router.get("/get/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {}
});

module.exports = router;
