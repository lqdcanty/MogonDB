var mongoose = require('mongoose');
var Schema = mongoose.Schema;//定义表模型
var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productNum":Number,
  "checked":String,
  "productImage":String
});
//module.exports 匿名输出module.exports.user
module.exports = mongoose.model('Good',productSchema);
