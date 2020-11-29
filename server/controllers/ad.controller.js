const multer = require("multer");
const path = require("path");
const fs = require('fs');
const Ads = require("../models/Ads");

exports.getAdById = (req, res, next, Id) => {
    Ads.findById(Id).exec((err, ad) => {
        if (err) {
          return res.status(400).json({
            errorMsg: "An error occured",
          })
        }
        if (!ad) {
          return res.status(400).json({
            errorMsg: "Ad not found",
          })
        }
        req.ads = ad
        next()
    })
}
    

fs.mkdir('uploads', (err) => { 
    if (err) {}
    fs.mkdir('uploads/ads', (err) => { 
        if (err) {}
    });
}); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ads');
    },
    filename: (req, file, cb) => {
    cb(null, "ad_" + new Date(Date.now()).toISOString().replace(/-|:|Z|\./g, '').replace(/T/g, '_') + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
exports.upload = multer({ storage: storage, fileFilter: fileFilter });

exports.createAd = (req, res) => {
    const {user, title, content, contact, price} = req.body;
    const files = req.files
    const picture = []
    for (let i = 0; i < files.length; i++)
    {
      picture[i] = files[i].path
    }
    const newAd = Ads({user, title, content, price, contact, picture})
    newAd.save((err, ad) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.status(200).json(ad)
      })
}

exports.allAds = (req, res) => {
    Ads.find().exec((err, ads) => {
        if (err) {
          res.status(400).json("error")
        }
        return res.json(ads)
    })
}
    