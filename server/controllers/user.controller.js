const User = require("../models/User")

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
  return res.json(req.profile)
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

exports.getAllUsers = (req, res) => {
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
