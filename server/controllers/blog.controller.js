const Blog = require("../models/Blogs");

exports.createBlog = (req, res) => {
    const {user, title, content} = req.body;
    const newBlog = Blog({user, title, content})
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