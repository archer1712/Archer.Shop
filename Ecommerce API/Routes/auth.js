const router = require("express").Router();
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.body.username });
    if (!currUser) {
      res.status(401).send("No Account Exists with this Username");
    } else if (currUser.password !== req.body.password) {
      res.status(401).send("Incorrect Password");
    } else {
      const accessToken = jwt.sign(
        {
          id: currUser._id,
          isAdmin: currUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      res.status(200).send({ currUser, accessToken });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
