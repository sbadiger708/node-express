var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    userId:{type:String, required:true},
    productName:{type:String, required:true},
    productType:{type:String, required:true},
    productCost:{type:Number, required:true}
});

module.exports = mongoose.model('Product',ProductSchema);