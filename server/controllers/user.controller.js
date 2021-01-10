const User = require("../models/User")
const formidable = require("formidable")
const fs = require("fs")
const Post = require("../models/Post")

exports.getUserById = (req, res, next, Id) => {
  User.findById(Id)
    .populate(
      "bookmark.blog bookmark.ads bookmark.post bookmark.job receivedReqs sentReqs friendList"
    )
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        })
      }
      if (!user) {
        return res.status(400).json({
          errorMsg: "User not found",
        })
      }
      req.profile = user
      next()
    })
}

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.encryptedpassword = undefined
  req.profile.salt = undefined
  req.profile.pic = undefined
  return res.json(req.profile)
}

// middleware for profile pic image for efficiency and performance
exports.getProfilePic = (req, res, next) => {
  if (req.profile.pic) {
    res.set("Content-Type", req.profile.pic.contentType)
    res.send(req.profile.pic.data)
  }
  next()
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      user.encryptedpassword = undefined
      user.salt = undefined
      return res.json(user)
    }
  )
}

exports.updateProfileImg = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured! must be a problem with image",
      })
    }
    let newData = req.profile
    if (file.pic) {
      if (file.pic.size > 2 * 1024 * 1024) {
        return res.status(400).json({
          errorMsg: "File size is too big",
        })
      }
      newData.pic.data = fs.readFileSync(file.pic.path)
      newData.pic.contentType = file.pic.type
    }
    newData.save((err, profilePic) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          errorMsg: "An error occured! While saving - Failed",
        })
      }
      res.json(profilePic)
    })
  })
}

exports.getAllUsers = (req, res) => {
  // Post.aggregate([
  //   {
  //     $lookup: {
  //       from: "User",
  //       localField: "user",
  //       foreignField: "_id",
  //       as: "allData",
  //     },
  //   },
  // ]).exec((err, result) => {
  //   if (err) {
  //     return res.json("err", err)
  //   }
  //   res.json(result)
  // })
  User.find()
    .populate(
      "bookmark.blog bookmark.ads bookmark.post bookmark.job receivedReqs sentReqs friendList"
    )
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        })
      }
      if (!users) {
        return res.status(400).json({
          errorMsg: "User not found",
        })
      }
      return res.json(users)
    })
}
exports.getAllBookmarks = (req, res) => {
  User.find({ _id: req.profile._id })
    .populate("bookmark.blog bookmark.post bookmark.ads bookmark.job ")
    .exec((err, bookmarks) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        })
      }
      res.json(bookmarks)
    })
}
exports.bookmark = (req, res) => {
  const { type } = req.body

  User.findByIdAndUpdate(
    { _id: req.profile._id, [`${type}`]: type },
    {
      $push: { [`bookmark.${type}`]: req.body.typeId },
    },
    { new: true, useFindAndModify: false }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ err, errorMsg: "An error occured, try again later" })
    }
    user.salt = undefined
    user.encryptedpassword = undefined
    res.status(200).json(user)
  })
}
exports.unBookmark = (req, res) => {
  const { type } = req.body

  User.findByIdAndUpdate(
    { _id: req.profile._id, [`${type}`]: type },
    {
      $pull: { [`bookmark.${type}`]: req.body.typeId },
    },
    { new: true, useFindAndModify: false }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ err, errorMsg: "An error occured, try again later" })
    }
    user.salt = undefined
    user.encryptedpassword = undefined
    res.status(200).json(user)
  })
}
exports.addFriend = (req, res) => {
  if (req.body.friendId == req.profile._id) {
    return
  }
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $push: { sentReqs: req.body.friendId },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" })
    }
    User.findByIdAndUpdate(
      { _id: req.body.friendId },
      {
        $push: { receivedReqs: req.profile._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).exec((err, userFriend) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      res.status(200).json(userFriend)
    })
  })
}

exports.acceptReq = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $pull: { receivedReqs: req.body.friendId },
      $push: { friendList: req.body.friendId },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" })
    }
    User.findByIdAndUpdate(
      { _id: req.body.friendId },
      {
        $pull: { sentReqs: req.profile._id },
        $push: { friendList: req.profile._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).exec((err, userFriend) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      res.status(200).json(userFriend)
    })
  })
}

exports.rejectReq = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $pull: { receivedReqs: req.body.friendId },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" })
    }
    User.findByIdAndUpdate(
      { _id: req.body.friendId },
      {
        $pull: { sentReqs: req.profile._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).exec((err, userFriend) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      res.status(200).json(userFriend)
    })
  })
}

exports.unfriend = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $pull: { friendList: req.body.friendId },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" })
    }
    User.findByIdAndUpdate(
      { _id: req.body.friendId },
      {
        $pull: { friendList: req.profile._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).exec((err, userFriend) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      res.status(200).json(userFriend)
    })
  })
}
