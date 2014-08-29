//设置使用的db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jockjsapi');
exports.mongoose = mongoose;
