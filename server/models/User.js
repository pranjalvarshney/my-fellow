const mongoose = require("mongoose")
const crypto = require("crypto")
const uuid = require("uuid")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pic: {
      data: Buffer,
      contentType: String,
    },
    intro: {
      type: String,
      max: 100,
      default: "Student",
    },
    year: {
      type: Number,
      trim: true,
    },
    branch: {
      type: String,
      max: 50,
    },
    rollno: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    encryptedpassword: {
      type: String,
      trim: true,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
      // 0 - Student
      // 1 - Faculty
      // 2 - Admin
    },
    bookmark: {
      post: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Post",
        },
      ],
      blog: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Blog",
        },
      ],
      ads: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Ads",
        },
      ],
      job: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Job",
        },
      ],
    },
    sentReqs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    receivedReqs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    friendList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
)

userSchema.virtual("password").set(function (password) {
  this.password
  this.salt = uuid.v1()
  this.encryptedpassword = this.securePassword(password)
})

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encryptedpassword
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return ""
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex")
    } catch (error) {
      return ""
    }
  },
}

module.exports = mongoose.model("User", userSchema)
