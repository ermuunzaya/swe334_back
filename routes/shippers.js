const express = require("express");
const Shipper = require("../modals/shippers");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shipper = await Shipper.find();
    res.json(shipper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const shipper = await Shipper.create(body);
    res.json(shipper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const shipper = await Shipper.findByIdAndUpdate(req.params.id, body);
  res.json(shipper);
});
router.get("/:id", async (req, res) => {
  try {
    const shipper = await Shipper.findById(req.params.id);
    res.json(shipper);
  } catch (error) {}
});

module.exports = router;
