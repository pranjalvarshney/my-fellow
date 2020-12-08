const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    objType: "post",
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      max: 3000,
    },
    picture: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)
