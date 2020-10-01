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
  res.render('login');
});

router.post('/query',function(req,res){
  if(req.session.username === undefined){
    res.json({
      login:false
    });
  }else{
    con.query('SELECT * FROM profile WHERE username = ?',[req.session.username],
    function(error,results){
      res.json({
        login:true,
        data:results[0]
      });
    });
  }
});

router.post('/submit',function(req,res){
  //해시 생성
  const hash = crypto.createHmac('sha256', SECRET_HASH)
    .update(req.body.password)
    .digest('hex');
  //로그인 정보 확인
  con.query('SELECT password FROM auth WHERE username = ?',[req.body.username],
  function(error,results){
    if(!results[0]){
      //로그인 실패
      res.json({
        login:false,
        username:req.body.username
      });
    }
    else{
      const password = results[0].password;
      if(password===hash){
        //로그인 성공
        req.session.username = req.body.username;
        console.log(req.body.username,'login');
        res.json({
          login:true,
          username:req.body.username
        });
      }
      else{
        //로그인 실패
        res.json({
          login:false,
          username:req.body.username
        });
      }
    }
  });
});

router.get('/logout',function(req,res,next){
  console.log(req.session.username,'logout');
  req.session = null;
  res.redirect('/');
});

module.exports = router;
