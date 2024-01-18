const express = require ("express");
const cors  = require("cors");
require("./utils/config");
const app = express();
const User = require("./utils/User");

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp) => {
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
})

app.listen(5000);