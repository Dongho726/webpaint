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

var router = express.Router();


// 기능 테스트용 라우터

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
