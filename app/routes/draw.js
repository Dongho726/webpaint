var express = require('express');
var multer = require('multer');
var aws = require('aws-sdk');
aws.config.loadFromPath('./awsconfig.json');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username === undefined){
    res.redirect('/login');
    return 0;
  }
  res.render('draw-index');
});

router.get('/:id/canvas',function(req,res){
  con.query('SELECT * FROM canvas WHERE canvas = ? AND user = ?',[req.params.id,req.session.id],
    function(error,results){
      if(!results[0]){
        res.redirect('/'); 
        return 0;
      }
      res.render('draw-canvas',{canvasid : req.params.id});
    });
});

router.get('/:id/settings',function(req,res){
  res.render('draw-settings');
});

router.post('/:id/load', function(req,res){
  var response = {
    mycanvas : {},
    othercanvas : []
  };
  con.query('SELECT * FROM canvas WHERE canvas = ?',[req.params.id],
  function(err,results){
    if(err){
      console.log(err);
    }
    results.forEach(element => {
      if(element.user == req.session.id){
        response.mycanvas = element;
      }
      else{
        response.othercanvas.push(element);
      }
    });
    res.json(response);
  });
});

router.post('/:id/submit', function(req,res){
  upload(req,res,function(err){
    if(err){
      console.log(err);
    }
    con.query('UPDATE canvas SET png = ? WHERE canvas = ? AND user = ?',[req.file.key,req.params.id,req.session.id],
    function(e,r){
      if(e){
        console.log(e);
      }
      res.json({ok:1});
    });
  });
});

module.exports = router;
