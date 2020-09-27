var express = require('express');
var WebSocket = require('ws');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.render('create');
  }
  else{
    res.redirect('/login');
  }
});

module.exports = router;
