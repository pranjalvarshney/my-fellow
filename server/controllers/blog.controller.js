const Blog = require("../models/Blogs");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
   
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
    const picture = req.file.path;
    const newBlog = Blog({user, title, content, picture})
    newBlog.save((err, blog) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.status(200).json(blog)
      })
}

exports.allblogs = (req, res) => {
    Blog.find().exec((err, blogs) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.json(blogs)
      })
}