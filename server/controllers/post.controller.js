const Post = require("../models/Post")
const multer = require("multer");
const path = require("path");
const fs = require('fs');
   
exports.getPostById = (req, res, next, Id) => {
  Post.findById(Id).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!post) {
      return res.status(400).json({
        errorMsg: "Post not found",
      })
    }
    req.posts = post
    next()
  })
}


fs.mkdir('uploads', (err) => { 
    if (err) {}
    fs.mkdir('uploads/posts', (err) => { 
      if (err) {}
  });
}); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/posts');
  },
  filename: (req, file, cb) => {
    cb(null, "post_" + new Date(Date.now()).toISOString().replace(/-|:|Z|\./g, '').replace(/T/g, '_') + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/svg+xml' || file.mimetype == 'video/mp4') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

exports.createPost = (req, res) => {
  const { user, content } = req.body
  const files = req.files
  const picture = []
  for (let i = 0; i < files.length; i++)
  {
    picture[i] = files[i].path
  }
  const newPost = Post({ user, content, picture })
  newPost.save((err, post) => {
    if (err) {
      res.status(400).json("error")
    }
    return res.status(200).json(post)
  })
}

exports.allposts = (req, res) => {
  Post.find().exec((err, posts) => {
    if (err) {
      res.status(400).json("error")
    }
    return res.json(posts)
  })
}

//Read a particular post
exports.getPost = (req, res) => {
    Post.find({_id: req.posts._id}).exec((err, post) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.json(post)
    })
}

// update post
exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.posts._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      return res.status(200).json(post)
    }
  )
}

// delete post
exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(
    { _id: req.posts._id },
    { useFindAndModify: false, new: true },
    (err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      return res.status(200).json({message: "Post has been deleted"})
    }
  )
}