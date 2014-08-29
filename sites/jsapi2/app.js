
    var express = require('express')
      , routes = require('./routes')
      , jsapi = require('./routes/jsapi')
      , http = require('http')
      , path = require('path')
      , ejs = require('ejs')
      //, SessionStore = require('session-mongoose')(express)
      ;
    var app = express();

    //设置环境
    app.set('port',process.env.PORT || 3000);
    app.set('views',__dirname + '/views');
    app.engine('.html', ejs.__express);//
    app.set('view engine', 'html');//html的模版引擎
    app.use(express.bodyParser());//解析json请求体
    app.use(express.methodOverride());//用于表单

    //加载处理http请求的中间件
    app.use(app.router);
    app.use(express.static(path.join(__dirname, './public')));

    //配置路径
    app.get('/', routes.index);
    app.get('/help',routes.help);
    app.get('/admin',routes.admin);  //后台管理页面
    app.post('/api/add',jsapi.add);//增和改
    app.get('/api/rm/:name',jsapi.removeByName);//删
    //app.post('/api/up',jsapi.updateByName);//改
    app.get('/modify/name/',jsapi.modifyName);
    app.get('/api/get',jsapi.fetch);//查
    app.get('/api/get/:name',jsapi.fetchByName);//查
    app.all('/demo/doc', routes.demoDoc);

    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
