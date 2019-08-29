var express = require('express');
var router = express.Router();
var UserSchema = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/adduser',(req,res)=>{
  var newUser = UserSchema();
  newUser.userId = req.body.userId;
  newUser.userName = req.body.userName;
  newUser.userEmail = req.body.userEmail;
  newUser.save((err,user)=>{
    if(!err && user){
      res.json({success:true, message:user});
    }else{
      res.json({success:false, message:err})
    }
  })
})

module.exports = router;
