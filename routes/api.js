var User = require('../models/user');
var router = require('express').Router();
// var Product = require('../models/products');
// var jwt = require('jsonwebtoken');
// var secret = 'harrypotter'; 

module.exports = (router) => {

    router.get('/allusers',(req,res)=>{
        User.find({}).select().exec((err, users)=>{
            if(!err && users){
                res.json({success:true, message:users});
            }else{
                res.json({success:false,  message:'No users found'});
            }
        })
    });

    // Route for Signup
    router.post('/adduser', (req,res)=>{
        var user = User();
        user.firstName = req.body.firstName;
        user.lastName  = req.body.lastName;
        user.email = req.body.email;
        // user.password = req.body.password;
        user.save((error, userData)=>{
            if(!error){
                res.json({success:true, message:userData});
            }else{
                res.json({success:false, message:error});
            }
        });
    });

    router.put('/updateuser',(req,res)=>{
        User.findOne({_id:req.body._id}).select().exec((err,user)=>{
            if(!err && user){
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.save((error,userData)=>{
                    if(!error && userData){
                        res.json({success:true, message:userData});
                    }else{
                        res.json({success:false, message:'Something went wrong'});
                    }
                })
            }else{
                res.json({success:false, message:err})
            }
        });
    });

    router.delete('/deleteuser/:id',(req,res)=>{
        User.findOneAndDelete({_id:req.params.id}).select().exec((err,user)=>{
            if(!err && user){
               res.json({success:true, message:user}); 
            }else{
                res.json({success:false, message:err})
            }
        });
    })

    return router;
}
