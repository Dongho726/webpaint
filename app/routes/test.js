var express = require('express');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'webpaint',
    acl: 'public-read'
  })
}).single('img');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '13.209.48.163',
  user     : 'root',
  password : 'isabel716',
  database : 'webpaint'
});

var router = express.Router();
con.connect();

router.get('/canvas', function(req,res){
  res.render('test-canvas');
});

router.get('/img', function(req, res, next) {
  res.render('test-img');
});
router.post('/img',function(req,res){
  upload(req,res,function(err){
    if(err){
      console.log(err);
    }
    console.log(req.file);
  });
  res.render('test-img');
});

router.get('/chat',function(req,res){
  res.render('test-chat');
});

module.exports = router;
