require("dotenv").config();
const express = require("express");

const connectDB = require("./db");
const authenticate = require("./middlewares/authenticate");
const routes = require("./routes/indexRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/private", authenticate, async (req, res, next) => {
  res.status(200).json({ message: "i am private" });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  return res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "server error occured" });
});

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port " + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
