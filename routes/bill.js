const express = require("express");
const Bill = require("../modals/bill");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bill = await Bill.find();
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const bill = await Bill.create(body);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const bill = await Bill.findByIdAndUpdate(req.params.id, body);
  res.json(bill);
});
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
  } catch (error) {}
});

module.exports = router;
