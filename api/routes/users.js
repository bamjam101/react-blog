const router = require("express").Router();
const bcyrpt = require("bcrypt");
const Post = require("../models/Post");
const User = require("../models/User");

//UPDATE user route handler
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      //if password is updated as well, it will be hashed again for security purpose
      const salt = await bcyrpt.genSalt(10);
      req.body.password = await bcyrpt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Cannot breach others account!");
  }
});

//DELETE user route handler
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted successfully.");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(404).json("No such user exists.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Cannot breach others account!");
  }
});

//GET user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
