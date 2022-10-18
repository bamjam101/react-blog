const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//POST new blog post route handler
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE blog post route handler
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE blog post route handler
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted....");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blog post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all blog posts route handler
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to handle likes
router.put("/:id/like", async (req, res) => {
  const { id } = req.params;
  const username = req.body.username;
  try {
      const post = await Post.findById(id);
      if (!post.liked.includes(username)) {
          await post.updateOne({ $push: { liked: username } })
          res.status(200).json("post has been liked")
      } else {
          await post.updateOne({ $pull: { liked: username } })
          res.status(200).json("post has been disliked")
      }
  } catch (err) {
      res.status(500).json(err)
  }
});

//Route to handle comments
router.put("/:id/comment", async (req, res) => {
  const { id } = req.params;
  const comment = {
      text: req.body.text,
      postedBy: req.body.user,
  }
  console.log(comment);
  try {
      await Post.findByIdAndUpdate(id, {
          $push: { comments: comment }
      }, { new: true })
      res.status(200).json("The Comment has been Added")
  } catch (err) {
      res.status(500).json(err)
  }
});

module.exports = router;
