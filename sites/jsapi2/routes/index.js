
    var Api = require('./../models/jsapi.js')
      ;

    exports.index = function(req, res){
         Api.fetch(function(err, api){
            if(err){
                console.log(err);
            }
             res.render('index',{
                 list: api
             });
         });
     };
    exports.help = function(req, res){
        res.render('includes/help/help')
    };
    exports.admin = function(req,res){
        Api.fetch(function(err, api){
            if(err){
                console.log(err);
            }
            res.render('admin',{
                list: api
            });
        });
    };
    exports.demoDoc = function(req,res){
        var json = req.body.content;
        if(json){
            res.render('includes/main/demoTemp.html',{
                data:json
            });
        }else{
            res.send({"success":false})
        }
    }