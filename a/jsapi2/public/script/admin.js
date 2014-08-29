/**
 * Created by hanhuizhang on 14-8-17.
 */
;
function getJson(){
    var arr = [];
    $.ajax({
        url:"/api/get/",
        type:"GET",
        async: false,
        success:function(data){
            arr = data;
        }
    });
    return arr;
}
//根据id得到doc
function getDocById(id,arr){
    for(var i in arr){
        if(arr[i].id==id){
            return arr[i];
        }
    }
}


//设置编辑器
var setEditor = function(){
        var api_editor = document.getElementById('apiDesc'),
            h_editor = document.getElementById('demoHtml'),
            c_editor = document.getElementById('demoCss'),
            j_editor = document.getElementById('demoJs'),
            code_editor = document.getElementById("resourceCode"),
            apiEditor,
            htmlEditor,
            cssEditor,
            jsEditor,
            codeEditor;
        apiEditor = CodeMirror.fromTextArea(api_editor, {
            lineWrapping : true,
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            mode : "htmlmixed",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        htmlEditor = CodeMirror.fromTextArea(h_editor, {
            lineWrapping : true,
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            mode : "htmlmixed",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        cssEditor = CodeMirror.fromTextArea(c_editor, {
            lineWrapping : true,
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            mode : "css",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        jsEditor = CodeMirror.fromTextArea(j_editor, {
            lineWrapping : true,
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            mode : "javascript",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        codeEditor = CodeMirror.fromTextArea(code_editor,{
            lineWrapping : true,
            keyMap: "sublime",
            smartIndent:true,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            mode: "javascript",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        //返回mirror对象
        return {
            api: apiEditor,
            h: htmlEditor,
            c: cssEditor,
            j: jsEditor,
            code: codeEditor
        }
    }

;
(function(){
    var editors = setEditor();
    var indexes;  //存放tree的节点
    //取得api
    indexes = getJson();
    //设置group的值
    function setGroup(moduleId){
        var selector = $("#apiGroup"),
            str = " <option value='-1' selected>请选择所属分组</option>",
            flag = false;
        for(var i in indexes){
            if(indexes[i].pId == moduleId && indexes[i].type=='group'){
                flag = true;
                str += "<option value="+indexes[i].id+">"+indexes[i].name+"</option>"
            }
        }
        if(flag){
            selector.html(str);
            selector.show();
        }else{
            selector.hide();
        }

    }

    //显示form数据
    function showData(json){
        $("input[name = 'api[name]']").attr('value',json['name']);
        $("select[name = 'api[type]'] option[value="+json['type']+"]").attr("selected","selected");
        $("apiId").attr('value',json['id']);
        $("apiPid").attr('value',json['pId']);

        if($("#apiModule option[value="+json['pId']+"]").length > 0){ //如果fu节点是module 选中module
            $("#apiModule option[value="+json['pId']+"]").attr("selected","selected");
            $("#apiGroup option[value='-1']").attr("selected","selected");
            setGroup(json['pId']);
        }else{
            var docP = getDocById(json['pId'],indexes),
                docPP;
            if(docP){
                docPP = getDocById(docP['pId'],indexes);
                $("#apiModule option[value="+docPP['id']+"]").attr("selected","selected");
                setGroup(docPP['id']);
                $("#apiGroup option[value="+docP['id']+"]").attr("selected","selected");
            }
        }

        //$("textarea[name = 'api[api]']").html('').html(json['api']);
        //json['demo'] && $("textarea[name = 'api[demo][html]']").html('').html(json['demo']['html']);
        //json['demo'] && $("textarea[name = 'api[demo][css]']").html('').html(json['demo']['css']);
        //json['demo'] && $("textarea[name = 'api[demo][js]']").html('').html(json['demo']['js']);
        //$("textarea[name = 'api[code]']").html('').html(json['code']);

        json['api'] && $("textarea[name = 'api[api]']").html('').html(json['api']);
        json['api'] && editors.api.setValue(json['api']);
        if(json['demo']){
            json['demo']['html'] && $("textarea[name = 'api[demo][html]']").html('').html(json['demo']['html']);
            json['demo']['html'] && editors.h.setValue(json['demo']['html']);
            json['demo']['css'] && $("textarea[name = 'api[demo][css]']").html('').html(json['demo']['css']);
            json['demo']['css'] && editors.c.setValue(json['demo']['css']);
            json['demo']['js'] && $("textarea[name = 'api[demo][js]']").html('').html(json['demo']['js']);
            json['demo']['js'] && editors.j.setValue(json['demo']['js']);
        }
        json['code'] && $("textarea[name = 'api[code]']").html('').html(json['code']);
        json['code'] && editors.code.setValue(json['code']);
    }

    //url存在hash时候
    if(location.hash){
        testNode(location.hash.substr(1));
    }

    //监听change事件
    $("#apiModule").change(function(){
        var moduleId = $(this).val();
        if(moduleId!==0){
            setGroup(moduleId);
        }

    });
    //点击按钮，检查节点
    $("#testBtn").click(function(){
        testNode($("#indexName").val());
    });

    //input失去焦点检测节点
    $('#indexName').blur(function(){
        testNode($("#indexName").val());
    });

    //检测节点
    function testNode(name){
        //var name = $("#indexName").val();
        if(name){
            $.ajax({
                url:"/api/get/"+name,
                type:"GET",
                async:false,
                success:function(data){
                    if(data){
                        showData(data);
                    }
                }
            });
        }
    }
    //提交表单
    $("#apiSubmit").click(function(e){
        //设置pId的value
        var mValue = $('#apiModule').val(),
            gValue = $('#apiGroup').val();
        if(gValue==-1){
            $('#apiPid').attr('value',mValue);
        }else{
            $('#apiPid').attr('value',gValue);
        }
        //设置id的value
        var date = new Date(),
            time = date.getTime();
        $('#apiId').attr('value',time);

        $("textarea[name = 'api[api]']").html('').html(editors.api.getValue());
        $("textarea[name = 'api[demo][html]']").html('').html(editors.h.getValue());
        $("textarea[name = 'api[demo][css]']").html('').html(editors.c.getValue());
        $("textarea[name = 'api[demo][js]']").html('').html(editors.j.getValue());
        $("textarea[name = 'api[code]']").html('').html(editors.code.getValue());

        $.ajax({
            url:'/api/add',
            data:$('form').serializeArray(),
            type:'POST',
            success:function(data){
                if(data.success){
                    alert("成功")
                    location.reload();
                }else{
                    alert(data.err);
                }
            }

        });
        e.preventDefault();
    });

    //删除
    $("#deleteBtn").click(function(){
        var name = $('#apiName').val();
        if(name){
            var flag = confirm("删除是不可逆操作，确定要删除吗？");
            if(flag){
                $.ajax({
                    url:"/api/rm/"+name,
                    type:"GET",
                    async:false,
                    success:function(data){
                        if(data.success){
                            alert(name+"已删除");
                            indexes = getJson();//重新获取数据
                        }else{
                            alert(data.err);
                        }
                    }
                });
            }
        }else{
            alert("请输入api名字");
        }
    });

    //修改api的名字
    $("#modifyApiName").click(function(){
        alert(0);
        var oldName = $("#oldApiName").val(),
            newName = $("#newApiName").val();
        if(oldName && newName && (oldName !== newName)){
            modifyApiName(oldName,newName);
        }

    });

    function modifyApiName(o,n){
        $.ajax({
            url:"/modify/name/" + "?oldname=" + o +"&newname=" + n,
            type:"GET",
            async: false,
            success:function(data){
                if(data.success){
                    alert("api"+o+"被修改为"+n);
                }
            }
        });
    }




}());
