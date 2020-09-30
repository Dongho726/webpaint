const express = require('express');
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
router.get('/:id', function(req, res, next) {
  con.query('SELECT * FROM profile WHERE id = ?',[req.params.id],
    function(error,results){
      if(!results[0]){
        res.redirect('/');
      }
      res.render('profile',results[0]);
    });
});

module.exports = router;
