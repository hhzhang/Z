/**
 * Created by hanhuizhang on 14-8-18.
 */

var mongodb = require('./mongodb')
    , Schema = mongodb.mongoose.Schema
    ;

var JsapiSchema = new Schema({
    id: {
        type:Number,
        unique: true,
        required: true,
        default:0
    }, //用当前时间做id
    name: {
        type:String,
        unique: true,
        required: true
    },
    pId: {
        type:Number,
        default: 0
    },
    type:{
        type:String,
        enum:['module','group','function']
    },
    api:String,
    demo:{
        css : String,
        js : String,
        html : String
    },
    code:String
});

var Jsapi = mongodb.mongoose.model("Jsapi",JsapiSchema);

//java中毒太深了
var JsapiDAO = function(){

};

//存储
JsapiDAO.prototype.save = function(obj,cb){
    var ins = new Jsapi(obj);
    ins.save(function(err){
        cb && cb(err);
    });
}

//查找
JsapiDAO.prototype.fetch = function(cb){
    Jsapi
        .find({})
        .exec(cb)
    ;
}

//根据名字查找
JsapiDAO.prototype.fetchByName = function(name,cb){
    Jsapi
        .findOne({"name":name})
        .exec(cb)
    ;
}

//根据名字更新
JsapiDAO.prototype.updateByName = function(name,obj,cb){
    Jsapi
        .update({"name":name},obj)
        .exec(cb)
    ;
}

//根据名字更新
JsapiDAO.prototype.updateById = function(id,obj,cb){
    Jsapi
        .update({"id":id},obj)
        .exec(cb)
    ;
}

//根据名字删除
JsapiDAO.prototype.removeById = function(id,cb){
    Jsapi
        .remove({"id":id})
        .exec(cb)
    ;
}


module.exports = new JsapiDAO();