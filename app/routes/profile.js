const express = require('express');
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
const router = express.Router();
con.connect();

router.get('/', function (req,res){
  if(req.session.username === undefined){
    res.redirect('/login');
    return 0;
  }
  con.query('SELECT * FROM profile WHERE username = ?',[req.session.username],
    function(error,results){
      if(results[0]){
        res.redirect(`/profile/${results[0].id}`);
      }else{
        res.redirect('/login');
      }
    });
});

router.get('/:id', function(req, res, next) {
  con.query('SELECT * FROM profile WHERE id = ?',[req.params.id],
    function(error,results){
      if(!results[0]){
        res.redirect('/');
      }
      res.render('profile',results[0]);
    });
});

router.post('/img',function(req,res){
  if(req.session.username === undefined){
    res.redirect('/login');
    return 0;
  }
  upload(req,res,function(err){
    if(err){
      console.log(err);
    }
    // name is req.file.key
    con.query('UPDATE profile SET img = ? WHERE username = ?',[req.file.key, req.session.username],function(err){
      if(err){
        console.log(err);
      }
    });
    res.redirect('/profile');
  });
});

router.post('/intro',function(req,res){
  if(req.session.username === undefined){
    res.redirect('/login');
    return 0;
  }
  con.query('UPDATE profile SET intro = ? WHERE username = ?',[req.body.intro, req.session.username],function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect('/profile');
});

module.exports = router;
