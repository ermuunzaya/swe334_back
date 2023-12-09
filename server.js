const { createReadStream } = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
// app.use(express.json());

app.use(cors());
app.use(express.json());
mongoose.connect(
  `mongodb+srv://b21fa1752:UP03291318@ufe.rjtwhqv.mongodb.net/swe334?retryWrites=true&w=majority`
);
const db = mongoose.connection;
// app.options('*',cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

db.once("open", () => console.log("Connected db"));
const upload = require("./uploads");
app.post("/uploads", upload.single("file"), (req, res) => {
  res.json({
    file: req.file.filename,
  });
});
app.get("/", (req, res) => {
  res.json({ text: "test" });
});
app.get("/upload/:file", (req, res) => {

  try {
    const file = createReadStream(
      path.join(__dirname, "./uploads/" + req.params.file)
    );
    res.sendFile(file.path);
  } catch (error) {}
});

const users = require("./routes/users");
const catalog = require("./routes/catalog");
const bill = require("./routes/bill");
const order = require("./routes/order");
const shipper = require("./routes/shippers");
const product = require("./routes/product");
app.use("/users", users);
app.use("/catalog", catalog);
app.use("/bill", bill);
app.use("/order", order);
app.use("/shipper", shipper);
app.use("/product", product);

app.listen(5000, () => {
  console.log("5000");
});
