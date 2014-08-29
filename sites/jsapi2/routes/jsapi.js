/**
 * Created by hanhuizhang on 14-8-18.
 */

var Jsapi = require('./../models/jsapi.js');

//添加
exports.add = function(req,res){
    var json = req.body.api,
        name = json.name;
    Jsapi.fetchByName(name,function(err,obj){
        if(!err){
            if(obj){
                delete json.name;
                json.id = obj.id;
                Jsapi.updateByName(name,json,function(err){
                    if(!err){
                        res.json({'success':true});
                    }else{
                        res.json({'success':false,'err':err});
                    }
                });
            }else{
                Jsapi.save(json, function(err){
                    if(!err){
                        res.json({'success':true});
                    }else{
                        res.json({'success':false,'err':err});
                    }
                });
            }
        }else{
            res.send('admin',{'success':false,'err':err});
        }
    });
}

//查找
exports.fetch = function(req,res){
    Jsapi.fetch(function(err, api){
        if(!err){
            res.json(api);
        }else{
            res.json({'success':false,'err':err});
        }
    });
}

//根据name更新
exports.updateByName = function(req,res){
    var json = req.body.json,
        name = json.name;
    delete json.name;
    Jsapi.updateByName(name,json,function(err){
        if(!err){
            res.json({'success':true});
        }else{
            res.json({'success':false,'err':err});
        }
    });
}

//根据name查找
exports.fetchByName = function(req,res){
    var name = req.params.name;
    Jsapi.fetchByName(name,function(err,json){
        if(!err){
            res.json(json);
        }else{
            res.json({'success':false,'err':err});
        }
    });
}


//根据name删除
exports.removeByName = function(req,res){
    var name = req.params.name;
    Jsapi.fetchByName(name,function(err,json){
        if(!err){
            if(json){
                Jsapi.removeByName(name,function(err){
                    if(!err){
                        res.json({'success':true});
                    }else{
                        res.json({'success':false,'err':'出错了'});
                    }
                });
            }else{
                res.json({'success':false,'err':'api不存在'});
            }
        }else{
            res.json({'success':false,'err':'出错了'});
        }
    });
}

//修改api的名字
exports.modifyName = function(req,res){
    var oldName = req.query.oldname,
        newName = req.query.newname;
    console.log(oldName+'old');
    console.log(newName+'new');
    Jsapi.fetchByName(newName,function(err,json){
        if(!err){
            if(!json){
                Jsapi.fetchByName(oldName,function(err,json){
                    if(json){
                        json.name = newName;
                        Jsapi.removeById(json.id,function(err){
                           if(!err){
                               Jsapi.save(json,function(err){
                                   if(!err){
                                       res.json({'success':true});                                   }
                               });
                           }
                        });
                    }else{
                        res.json({'success':false,err:'旧名字不存在。'});
                    }
                })
            }else{
                res.json({'success':false,err:'新名字已经存在了，请换另外的名字。'});
            }
        }
    });
}
