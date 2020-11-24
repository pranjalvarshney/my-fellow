const Post = require("../models/Post")

exports.createPost = (req, res) => {
  const { user, content } = req.body
  const newPost = Post({ user, content })
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
