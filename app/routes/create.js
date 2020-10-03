var express = require('express');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '13.209.48.163',
  user     : 'root',
  password : 'isabel716',
  database : 'webpaint'
});
const router = express.Router();
con.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.render('create');
  }
  else{
    res.redirect('/login');
  }
});

router.post('/submit', function(req,res){
  console.log(req.body);
  console.log(req.session.id);
  con.query('INSERT INTO drawing (name,admin,access) VALUES (?,?,?)',[req.body.name,req.session.id,req.body.access],function(err,results){
    if(err){
      console.log(err);
    }
    con.query('INSERT INTO canvas (canvas,user) VALUES (?,?)',[results.insertId,req.session.id],function(e,r){
      if(e){
        console.log(e)
      }
      res.redirect(`/draw/${results.insertId}/canvas`);
    });
  });
});

router.post('/duplicate',function(req,res,next){
  con.query('SELECT * FROM drawing WHERE name = ?',[req.body.createName],
  function(error, results){
    if(error){
      console.log(error);
    }
    if(results.length === 0){
      res.json({
        duplicated:false,
        createName:req.body.createName
      });
    }
    else{
      res.json({
        duplicated:true,
        createName:req.body.createName
      });
    }
  });
});

module.exports = router;
