var express = require('express');
var app = express();
var port = process.env.PORT | 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api', appRoutes);

// mongoose.connect('mongodb://127.0.0.1:27017/testdb',(err)=>{
//     if(!err){
//         console.log('Successfully connected to mongoDB');
//     }else{
//         console.log("Error while connecting to MongoDB");
//     }
// });

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname,'public', 'index.html'));
});

app.listen(port,(err)=>{
    if(!err){
        console.log('Server started on '+port);
    }else{
        console.log('Failed to start server on '+port);
    }
})