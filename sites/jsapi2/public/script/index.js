/**
 * Created by hanhuizhang on 14-7-17.
 */
    //mirror对象
    var mirror = function (editor,options){
        var def = {
            lineWrapping : true,
            lineNumbers: true,
            mode: "",
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            theme: "monokai"
        };
        options = $.extend(def, options);
        return CodeMirror(editor, options);
    }

    //模版引擎对象
    var template = (function(cache, $) {
        return function(str, data) {
            var fn = !/\s/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : function(data) {
                var i,variable = [$],value = [[]];
                for (i in data) {
                    variable.push(i);
                    value.push(data[i])
                };
                return (new Function(variable, fn.$)).apply(data, value).join("");
            };
            fn.$ = fn.$ || $ + ".push('"
                + str.replace(/\\/g, "\\\\")
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join($ + ".push('")
                .split("\r").join("\\'")
                + "');return " + $;
            return data ? fn(data) : fn
        }
    })({},'$'+(+new Date));

    //工具对象
    var util = {
        //encodeHtml
        encode : function(s){
            return s
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        },
        //decodeHtml
        decode : function(s){
            var str = s
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
            //处理转义的中文和实体字符
            return str.replace(/&#([\d]+);/g, function(_0, _1){
                return String.fromCharCode(parseInt(_1, 10));
            });
        },
        //去掉字符串的换行、回车、前后空格
        trim : function(s){
            return s
                .replace(/^\s+|\s+$/g,"")
                .replace(/[\r\n]/g,"");
        },
        //构建关联数组
        addOtherIndex : function(arr,index){
            if(!arr)return;
            for(var i = 0, len = arr.length; i<len; i++){
                arr[i][index]? arr[arr[i][index]] = arr[i]: '';
            }
            return arr;
        },
        //判断对象是否为空
        isEmptyObj : function(obj){
            for ( var k in obj ) {
                if(obj[k]){
                    return false;
                }
            }
            return true;
        },
        //得到url的hash
        getHash : function(){
            return location.hash.substr(1);
        },
        //渲染模板
        getHtml : function(str,obj){
            return template(str,obj);
        },
        //得到doc
        getObj : function(type,hash){
            hash = hash||this.getHash();
            if(!hash)return false;
            return type[hash];
        },
        //ajax获取数据
        getData : function(opt,cb){
            var def = {
                type: "GET",
                async: false,
                url: "",
                success:function(data){
                    cb && cb(data);
                },
                error:function(e){
                }
            };
            opt = $.extend(def,opt);
            $.ajax(opt);
        },
        //发送数据
        postData : function(opt,cb){
            var def = {
                type: "POST",
                url: "",
                data: {},
                success:function(data){
                    cb && cb(data);
                },
                error:function(e){
                   
                }
            }
            opt = $.extend(def,opt);
            $.ajax(opt);
        }
    }

    //取得页面的json
    var getPageJson = function(cb){
        util.getData({url:'/api/get'},cb)
    }

    //设置编辑器
    var setEditor = function(){
        var h_editor = document.getElementById('htmlEditor'),
            c_editor = document.getElementById('cssEditor'),
            j_editor = document.getElementById('jsEditor'),
            code_editor = document.getElementById("codeEditor"),
            htmlEditor,
            cssEditor,
            jsEditor,
            codeEditor;

        htmlEditor = mirror(h_editor, {
            mode : "htmlmixed",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        cssEditor = mirror(c_editor, {
            mode : "css",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        jsEditor = mirror(j_editor, {
            mode : "javascript",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        codeEditor = mirror(code_editor,{
            mode: "javascript",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        htmlEditor.setValue("努力加载html代码中...");
        cssEditor.setValue("努力加载css代码中...");
        jsEditor.setValue("努力加载javascript代码中...");
        codeEditor.setValue("努力加载源代码中...");
        //返回mirror对象
        return {
            h: htmlEditor,
            c: cssEditor,
            j: jsEditor,
            code: codeEditor
        }
    }

    //业务对象
    var business = {
        //渲染api页面
        renderApi : function(str){
            $("#api").html("").html(str);
        },
        //渲染编辑器
        renderEditor : function(editor,value){
            editor.setValue(value);
        },
        //取得frame里面id元素得innerHTML
        getFrameContent : function(id){
            var d = window.top.document.getElementById("apiFrame").contentWindow.document;
            return d.getElementById(id)? util.trim(d.getElementById(id).innerHTML) :"";
        },
        //取得编辑器的value
        getEditorValue : function(editor){
            editor.getValue();
        },
        //设置编辑器缩进
        setFormat:function(editor){
            var totalLines = editor.lineCount();
            var totalChars = editor.getValue().length;
            editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
        },
        //iframe高度自适应
        SetWinHeight: function (obj) {
            var win = obj;
            if (document.getElementById) {
                if (win && !window.opera) {
                    if (win.contentDocument && win.contentDocument.body.offsetHeight)
                        win.height = win.contentDocument.body.offsetHeight;
                    else if (win.Document && win.Document.body.scrollHeight)
                        win.height = win.Document.body.scrollHeight;
                }
            }
        },
        //post data 得到iframe内容
        jointFrameContent : function(obj,cb){
            var d = {};
            d["content"] = obj;
            util.postData({url: "/demo/doc",data: d},function(data){
                var w = document.getElementById("apiFrame").contentWindow,
                    d = w.document;
                d.write(util.decode(data));
                d.close();
                cb && cb();
                d.addEventListener("DOMContentLoaded",function(){
                    cb && cb();
                },false);
            });
        },
        //显示welcome页面
        showWel : function(){
            $("#main").hide(); //隐藏主页面
            $("#welcome").show();  //显示欢迎页面
        },
        showMain : function(){
            $("#welcome").hide();
            $("#main").show();
        },
        //显示demo
        showDemo : function(){
            $("#editorTip").hide();
            $("#editor").show();
            $("#apiFrame").show();
        },
        //显示无demo状态
        showNoDemo : function(){
            $("#editorTip").show();
            $("#editor").hide();
            $("#apiFrame").hide();
        },
        //显示源码
        showCode : function(){
            $("#codeEditor").show();
            $("#codeEditorTip").hide();
        },
        //显示无源码状态
        showNoCode : function(){
            $("#codeEditor").hide();
            $("#codeEditorTip").show();
        }
    }

    //代码运行对象
    var codeRunner = {
        run:function(editor){
            var d = {};
            //取得编辑器的value
            d["css"] = editor.c.getValue();
            d["html"] = editor.h.getValue();
            d["js"] = editor.j.getValue();
            business.jointFrameContent(d);
        },
        reset:function(demoDoc,editor){
            business.jointFrameContent(demoDoc,function(){
                var g = business.getFrameContent;
                business.renderEditor(editor.c, g("demoCss"));
                business.renderEditor(editor.h, g("demoHtml"));
                business.renderEditor(editor.j, g("demoJs"));
            });
        }
    }

    //搜索
    var searcher = function(data){
        var arr = [];
        for(var i in data){
                var node = {
                    value:data[i].name
                }
            for(var j in arr){
                if(arr[j].value==node.value){
                    node = null;
                    break;
                }
            }
            node && arr.push(node);
        }
        $("#autocomplete").autocomplete({
            lookup:arr,
            onSelect:function(suggestion){
                location.hash = suggestion.value;
            }
        });
        }

    //init 入口函数
    ;
    (function(){
        var apiArr; //api的json数组

        //设置编辑器: html,js,css,code
        var editor = setEditor();
        //娶到页面的数据
        getPageJson(function(data){
            apiArr = util.addOtherIndex(data,"name");
        });
        //一个集合
        var apiDoc = {},
            apiStr = '',
            demoDoc = null,
            codeStr = ''
        ;
        //渲染tab页面
        function renderPage(){
            apiDoc = util.getObj(apiArr);
            //设置api
            if(apiDoc){
                apiStr = apiDoc.api;
                demoDoc = apiDoc.demo;
                codeStr = apiDoc.code;
                if(apiDoc.type=="function"){
                    if(apiStr){
                        business.renderApi(util.decode(apiStr));
                    }else{
                        business.renderApi("暂无Api");
                    }
                    business.showMain();
                }else{
                    business.showWel();
                }
                //设置demo
                if(!util.isEmptyObj(demoDoc)){
                    business.jointFrameContent(demoDoc,function(){
                        var g = business.getFrameContent;
                        business.renderEditor(editor.c, demoDoc["css"]);
                        business.renderEditor(editor.h, demoDoc["html"]);
                        business.renderEditor(editor.j, demoDoc["js"]);
                    });
                    business.showDemo();
                }else{
                    business.showNoDemo();
                }
                //设置code
                if(codeStr){
                    business.renderEditor(editor.code, codeStr);
                    business.showCode();
                }else{
                    business.showNoCode();
                }
            }else{
                business.showWel();
            }
        }
        renderPage();

        //给“运行”绑定事件
        $("#codeRun").click(function(){
            codeRunner.run(editor);
        });
        //给“重置”绑定事件
        $("#codeReset").click(function(){
            codeRunner.reset(demoDoc,editor);
            alert('成功了');
        });
        //监听hash变化
        window.onhashchange = function(){
            renderPage();
            var href = $("#adminApi").attr("href").split("#")[0];
            $("#adminApi").attr("href",href+location.hash);
        }
        //iframe高度自适应
        document.getElementById("apiFrame").onload = function(){
            business.SetWinHeight(this);
        }
        //hack: code mirror和bootstrap有冲突
        $('a[data-toggle="tab"]').on('shown.bs.tab',function (e){
            for(var i in editor) {
                editor[i].refresh();
            }
        });

        //搜索
        searcher(apiArr);

        //点击维护api的时候加参数
        $("#adminApi").click(function(){
            if($(this).attr('href').indexOf('#') < 0){
                var href = $(this).attr('href') + location.hash;
                $(this).attr('href',href);
            }
        });

    })();
