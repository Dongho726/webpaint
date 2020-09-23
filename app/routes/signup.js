var express = require('express');
const crypto = require('crypto');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '13.209.48.163',
  user     : 'root',
  password : 'isabel716',
  database : 'webpaint'
});
const router = express.Router();
con.connect();

const SECRET_HASH = '화합6팀';

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/duplicate',function(req,res,next){
  con.query('SELECT * FROM auth WHERE username = ?',[req.body.username],
  function(error, results){
    if(error){
      console.log(error);
    }
    if(results.length === 0){
      res.json({
        duplicated:false,
        username:req.body.username
      });
    }
    else{
      res.json({
        duplicated:true,
        username:req.body.username
      });
    }
  });
});

router.post('/submit',function(req,res){
  // 해시 생성
  const hash = crypto.createHmac('sha256', SECRET_HASH)
    .update(req.body.password)
    .digest('hex');
  // 데이터베이스 서버에 정보 전송
  con.query('INSERT INTO profile (username) VALUES (?)',[req.body.username],function (error,results){
    if(error){
      console.log(error);
      res.json({
        registered:false,
        username:req.body.username
      });
    }
    else{
      con.query('INSERT INTO auth (username,password) VALUES (?,?)',[req.body.username, hash],
      function (error, results) {
        if(error){
          console.log(error);
          res.json({
            registered:false,
            username:req.body.username
          });
        }
        else{
          res.json({
            registered:true,
            username:req.body.username
          });
        }
      }); 
    }
  });
});

module.exports = router;
