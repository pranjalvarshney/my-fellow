const User = require("../models/User");
const fs = require("fs");
const async = require("async");

exports.getUserById = (req, res, next, Id) => {
  User.findById(Id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    if (!user) {
      return res.status(400).json({
        errorMsg: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.encryptedpassword = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      user.encryptedpassword = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    if (!users) {
      return res.status(400).json({
        errorMsg: "User not found",
      });
    }
    return res.json(users);
  });
};
exports.getAllBookmarks = (req, res) => {
  User.find({ _id: req.profile._id })
    .populate("bookmark.blog bookmark.post bookmark.ads bookmark.job ")
    .exec((err, bookmarks) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        });
      }
      res.json(bookmarks);
    });
};
exports.bookmark = (req, res) => {
  const { type } = req.body;

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
        .json({ err, errorMsg: "An error occured, try again later" });
    }
    user.salt = undefined;
    user.encryptedpassword = undefined;
    res.status(200).json(user);
  });
};

exports.addFriend = (req, res) => {
  const userId = req.body.userId;
  if (userId == req.profile._id) {
    userId = null;
  }
  User.findById({ _id: userId }).exec((err, friend) => {
    if (err) {
      return res
        .json(400)
        .json({ errorMsg: "An error occured, try again later" });
    }
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      {
        $push: { sentReqs: { userId: friend._id } },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json(result);
      }
    );
  });
};
