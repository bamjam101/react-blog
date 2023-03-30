const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

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
    const comments = await Comment.find({ postId: req.params.id });
    const response = { ...post._doc, comments };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  const search = req.query.search;
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
    } else if (!(search === "" || search === null)) {
      posts = await Post.find({
        $or: [
          { title: new RegExp(search, "g") },
          { username: new RegExp(search, "g") },
          { categories: new RegExp(search, "g") },
        ],
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
      await post.updateOne({ $push: { liked: username } });
      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { liked: username } });
      res.status(200).json("post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to handle comments
router.post("/:id/comment", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = new Comment({
      postId: id,
      text: req.body.text,
      commentBy: req.body.user,
    }).save();
    res.status(200).json("The Comment has been Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:postId/comment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $push: {
          nestedComment: {
            text: req.body.text,
            commentBy: req.body.user,
          },
        },
      }
    );

    res.status(200).json("The Comment has been Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
