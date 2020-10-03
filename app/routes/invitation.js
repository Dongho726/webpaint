var express = require('express');
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
  res.render('invitation');
});

router.post('/load', function(req,res){
  var response = {
    invitations : []
  };
  con.query('SELECT * FROM invitation AS i JOIN drawing AS d ON (i.canvas = d.id) WHERE user = ? AND response = 0',[req.session.id],
    function(err,results){
      if(err){
        console.log(err);
      }
      console.log(results);
      results.forEach(element => {
        response.invitations.push(element);
      });
      res.json(response);
    });
});

module.exports = router;
