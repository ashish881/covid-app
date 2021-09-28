const express = require("express");
const env = require("dotenv");
const conMongodb = require("./db");
const app = express();

env.config();
conMongodb();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
//Routes
app.use("/api/user", require("./Routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log("running on Port 5000");
});
