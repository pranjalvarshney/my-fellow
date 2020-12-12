const mongoose = require("mongoose")

const pollSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  poll: {
    type: String,
    required: true,
  },
  yes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  no: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  skip: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
})

module.exports = mongoose.model("Poll", pollSchema)
