var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('invitation');
});

router.post('/load', function(req,res){
  var response = {
    invitations : []
  };
  con.query('SELECT * FROM invitaion WHERE user = ?',[req.session.id],
  function(err,results){
    if(err){
      console.log(err);
    }
    results.forEach(element => {
      response.invitations.push(element);
    });
  });
  res.render('index');
});

module.exports = router;
