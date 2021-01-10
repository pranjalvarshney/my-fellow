const mongoose = require("mongoose")

const adsSchema = new mongoose.Schema(
  {
    objType: {
      type: String,
      default: "ads",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      max: 50,
    },
    content: {
      type: String,
      max: 3000,
    },
    contact: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
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

module.exports = mongoose.model("Ads", adsSchema)
