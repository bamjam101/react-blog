const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  text: {
    type: String,
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
  nestedComment: [
    {
      text: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
      commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Comment", CommentSchema);
