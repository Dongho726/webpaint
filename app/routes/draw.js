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
  if(req.session.username === undefined){
    res.redirect('/login');
    return 0;
  }
  res.render('draw-index');
});

router.get('/:id/canvas',function(req,res){
  res.render('draw');
});

router.get('/:id/settings',function(req,res){
  res.render('draw');
});

module.exports = router;
