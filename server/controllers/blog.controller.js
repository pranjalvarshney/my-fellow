const Blog = require("../models/Blogs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getUserById } = require("../controllers/user.controller");

exports.getBlogById = (req, res, next, Id) => {
  Blog.findById(Id)
    .populate("user upvotes.user comments.user")
    .exec((err, blog) => {
      if (err) {
        return res.status(400).json({
          errorMsg: "An error occured",
        });
      }
      if (!blog) {
        return res.status(400).json({
          errorMsg: "Blog not found",
        });
      }
      blog.user.salt = undefined;
      blog.user.encryptedpassword = undefined;
      req.blogs = blog;
      next();
    });
};

fs.mkdir("uploads", (err) => {
  if (err) {
  }
  fs.mkdir("uploads/blogs", (err) => {
    if (err) {
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "blog_" +
        new Date(Date.now())
          .toISOString()
          .replace(/-|:|Z|\./g, "")
          .replace(/T/g, "_") +
        path.extname(file.originalname)
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

//create blog
exports.createBlog = (req, res) => {
  const { user, title, content } = req.body;
  var picture;
  if (req.file) {
    picture = req.file.path;
  }
  const newBlog = Blog({ user, title, content, picture });
  newBlog.save((err, blog) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.status(200).json(blog);
  });
};

// read all blogs
exports.allblogs = (req, res) => {
  Blog.find()
    .populate("user upvotes.user comments.user")
    .sort({ createdAt: -1 })
    .exec((err, blogs) => {
      if (err) {
        res.status(400).json({
          errorMsg: "An error occured",
        });
      }

      blogs.map((blog) => {
        blog.user.salt = undefined;
        blog.user.encryptedpassword = undefined;
      });
      return res.json(blogs);
    });
};

//Read a particular blog
exports.getBlog = (req, res) => {
  Blog.find({ _id: req.blogs._id }).exec((err, blog) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(blog);
  });
};

// update blog
exports.updateBlog = (req, res) => {
  Blog.findById({ _id: req.blogs._id }).exec((err, blog) => {
    if (blog.picture) {
      let path = blog.picture;
      fs.readdir(path, (err, files) => {
        if (path) {
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      });
    }
  });
  const { user, title, content } = req.body;
  var picture;
  if (req.file) {
    picture = req.file.path;
  }
  const updateObj = { user, title, content, picture };

  Blog.findByIdAndUpdate(
    { _id: req.blogs._id },
    { $set: updateObj },
    { useFindAndModify: false, new: true },
    (err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json(blog);
    }
  );
};

// delete blog
exports.deleteBlog = (req, res) => {
  Blog.findById({ _id: req.blogs._id }).exec((err, blog) => {
    if (blog.picture) {
      let path = blog.picture;
      fs.readdir(path, (err, files) => {
        if (path) {
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      });
    }
  });
  Blog.findByIdAndRemove(
    { _id: req.blogs._id },
    { useFindAndModify: false, new: true },
    (err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json({ message: "Blog has been deleted" });
    }
  );
};

// Upvote a blog
exports.upvoteBlog = (req, res) => {
  Blog.findByIdAndUpdate(
    { _id: req.blogs._id },
    {
      $push: { upvotes: req.profile._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" });
    } else {
      res.status(200).json(result);
    }
  });
};

// Downvote a blog
exports.downvoteBlog = (req, res) => {
  Blog.findByIdAndUpdate(
    { _id: req.blogs._id },
    {
      $pull: { upvotes: req.profile._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" });
    } else {
      res.status(200).json(result);
    }
  });
};

// comment on a blog
exports.commentBlog = (req, res) => {
  Blog.findByIdAndUpdate(
    { _id: req.blogs._id },
    {
      $push: {
        comments: { user: req.profile._id, text: req.body.text },
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.countShareBlog = (req, res) => {
  Blog.findById({ _id: req.blogs._id }).exec((err, blog) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMsg: "An error occured, try again later" });
    }

    blog.shareCount++;
    blog.save();
    res.json(blog);
  });
};

exports.getAllBlogByUser = (req, res) => {
  Blog.find({ user: req.profile._id })
    .populate("user upvotes.user comments.user")
    .sort({ createdAt: -1 })
    .exec((err, blogs) => {
      if (err) {
        return res
          .json(400)
          .json({ errorMsg: "An error occured, try again later" });
      }
      res.status(200).json(blogs);
    });
};
