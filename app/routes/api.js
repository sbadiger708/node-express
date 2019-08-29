var User = require('../models/user');
var Product = require('../models/products');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter'; 

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
        // User.find({}).select().exec((err, exist)=>{
        //     if(!err && exist){
        //         res.json({success:false, message:'Email already exist'});
        //     }else{
        //         user.save((error, userData)=>{
        //             if(!error){
        //                 res.json({success:true, message:userData});
        //             }else{
        //                 res.json({success:false, message:error});
        //             }
        //         });
        //     }
        // });
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
    // // Route for login
    // router.post('/login',(req,res)=>{
    //     User.findOne({email:req.body.email}).select('_id email role password').exec((err, user)=>{
    //         if(!err && user){
    //             if(!req.body.password){
    //                 res.json({success:false, message:'Please provide Password'});
    //             }else{
    //                 var validPassword = user.comparePassword(req.body.password, user.password);
    //                 console.log(validPassword)
    //                 if(validPassword){
    //                     var token = jwt.sign({ email: user.email, _id:user._id, role:user.role }, secret, { expiresIn: '24h' });
    //                     res.json({success:true, message:'Login success', token:token});
    //                 }else{
    //                     res.json({success:false, message:'Invalid Password'});
    //                 }
    //             }
    //         }else{
    //             res.json({success:false, message:"Email does not exist"});
    //         }
    //     });
    // });



    // // Route to get all Products
    // router.get('/allproduct',(req,res)=>{
    //     Product.find({},(err,products)=>{
    //         if(!err && products){
    //             res.json({success:true, message:products});
    //         }else{
    //             res.json({success:false, message:'No Products found'});
    //         }
    //     });
    // });

    // // Code to handle token decoding
    // router.use((req, res, next)=>{
    //     var token = req.body.token || req.params.token || req.header['x-access-token'];
    //     if(token){
    //         jwt.verify(token, secret, (err, decoded)=>{
    //             if(!err && decoded){
    //                 req.decoded = decoded;
    //                 next();
    //             }else{
    //                 // res.json({success:false, message:err});
    //                 if(err.name === "TokenExpiredError"){
    //                     res.json({success:false, message:'Session Expired, Please login again!'});
    //                 }else if(err.name === "JsonWebTokenError"){
    //                     res.json({success:false, message:'Invalid Token, Please login'});
    //                 }
    //             }
    //         });
    //     }else{
    //         res.json({success:false, message:'No token provided'});
    //     }
    // });

    // // get the data from token by decoding it
    // router.get('/me', (req,res)=>{
    //     res.send(req.decoded);
    // });

    // // ROuter to get User details
    // router.get('/profile',(req,res)=>{
    //     User.findOne({email:req.decoded.email}).select().exec((err, user)=>{
    //         if(!err && user){
    //             res.json({success:true, message:user})
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route to update Profile
    // router.put('/updateprofile',(req,res)=>{
    //     User.findByIdAndUpdate({_id:req.decoded._id}).select().exec((err, user)=>{
    //         if(!err && user){
    //             user.email = req.body.email;
    //             user.firstName = req.body.firstName;
    //             user.lastName = req.body.lastName;
    //             user.save((error, userData)=>{
    //                 if(!error && userData){
    //                     res.json({success:true, message:userData});
    //                 }else{
    //                     res.json({success:false, message:'Cannot update profile'});
    //                 }
    //             })
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route to add Products
    // router.post('/add-product',(req,res)=>{
    //     User.findById({_id:req.decoded._id}).select().exec((err, user)=>{
    //         if(!err && user){
    //             var product = Product();
    //             product.userId = user._id;
    //             product.productName = req.body.productName;
    //             product.productType = req.body.productType;
    //             product.productCost = req.body.productCost;
    //             product.save((error, product)=>{
    //                 if(!error && product){
    //                     res.json({success:true, message:product});
    //                 }else{
    //                     res.json({success:false, message:'Cannot save Products'});
    //                 }
    //             })

    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route to get all Products of a Perticular user
    // router.post('/products',(req, res)=>{
    //     User.findOne({_id:req.decoded._id}).select().exec((err, user)=>{
    //         if(!err && user){
    //             Product.find({userId:user._id}).select().exec((error, products)=>{
    //                 if(!error && products){
    //                     res.json({success:true, message:products});
    //                 }else{
    //                     res,json({success:false, message:'No Products found'});
    //                 }
    //             })
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route to get Single Product Data
    // router.post('/product',(req, res)=>{
    //     User.findOne({_id:req.decoded._id}).select().exec((err, user)=>{
    //         if(!err && user){
    //             Product.findOne({_id:req.body._id, userId:user._id}).select().exec((error, product)=>{
    //                 if(!error && product){
    //                     res.json({success:true, message:product});
    //                 }else{
    //                     res.json({success:false, message:'Product Not found'});
    //                 }
    //             })
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route to update Product
    // router.post('/update-product',(req, res)=>{
    //     User.findOne({_id:req.decoded._id}).select('_id').exec((err, user)=>{
    //         if(!err && user){
    //             Product.findOne({_id:req.body._id}).select().exec((error, product)=>{
    //                if(!error && product){
    //                     product.productName = req.body.productName;
    //                     product.productCost = req.body.productCost;
    //                     product.productType = req.body.productType;
    //                     product.save((errr, products)=>{
    //                         if(!errr && products){
    //                             res.json({success:true, message:products});
    //                         }else{
    //                             res.json({success:false, message:'Cannot save Products'})
    //                         }
    //                     })
    //                }else{
    //                 res.json({success:false, message:error});
    //                 //    res.json({success:false, message:'Product not found'});
    //                }
    //             })
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //     });
    // });

    // // Route for delete Product
    //  router.post('/delete-product',(req,res)=>{
    //      User.findOne({_id:req.decoded._id}).select().exec((err, user)=>{
    //         if(!err && user){
    //             Product.findByIdAndDelete({_id:req.body._id,userId:user._id}).select().exec((error, product)=>{
    //                 if(!error && product){
    //                     res.json({success:true, message:product});
    //                 }else{
    //                     res.json({success:false, message:'Product not found'});
    //                 }
    //             });
    //         }else{
    //             res.json({success:false, message:'User not found'});
    //         }
    //      });
    //  });
