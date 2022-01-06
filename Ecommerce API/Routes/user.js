const router = require("express").Router();
const User = require("../Models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//UPDATE A USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(UpdatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A USER
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const currUser = await User.findById(req.params.id);
    return res.status(200).json(currUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const Users = query
      ? await User.find().sort({ _id: -2 }).limit(5)
      : await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
