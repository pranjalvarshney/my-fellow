const Blog = require("../models/Blogs");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

exports.getBlogById = (req, res, next, Id) => {
  Blog.findById(Id).exec((err, blog) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (!blog) {
      return res.status(400).json({
        errorMsg: "Blog not found",
      })
    }
    req.blogs = blog
    next()
  })
}


fs.mkdir('uploads', (err) => { 
    if (err) {}
    fs.mkdir('uploads/blogs', (err) => { 
      if (err) {}
  });
}); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/blogs');
  },
  filename: (req, file, cb) => {
    cb(null, "blog_" + new Date(Date.now()).toISOString().replace(/-|:|Z|\./g, '').replace(/T/g, '_') + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

exports.createBlog = (req, res) => {
    const {user, title, content} = req.body;
    var picture;
    if(req.file){
      picture = req.file.path;
    }
    const newBlog = Blog({user, title, content, picture})
    newBlog.save((err, blog) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.status(200).json(blog)
      })
}

// read all blogs
exports.allblogs = (req, res) => {
    Blog.find().exec((err, blogs) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.json(blogs)
      })
}

//Read a particular blog
exports.getBlog = (req, res) => {
    Blog.find({_id: req.blogs._id}).exec((err, blog) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.json(blog)
    })
}


// update blog
exports.updateBlog = (req, res) => {
  Blog.findByIdAndUpdate(
    { _id: req.blogs._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      return res.status(200).json(blog)
    }
  )
}

// delete blog
exports.deleteBlog = (req, res) => {
  Blog.findByIdAndRemove(
    { _id: req.blogs._id },
    { useFindAndModify: false, new: true },
    (err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        })
      }
      return res.status(200).json({message: "Blog has been deleted"})
    }
  )
}