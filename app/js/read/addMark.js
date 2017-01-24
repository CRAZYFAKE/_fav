var openMark = true;
$(".read_content").mouseup(function (e) {
    if(!openMark){
        return false;
    }
    // 注：此处加setTimeOut的目的是解决点击选中区域不让工具框再次出现
    setTimeout(function(){
        var dom = $("font[face='nrj_tep']");
        var domSize = dom.size();
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith(dom.eq(x).html());
        }
        var event = window.event || e;
        var sText = document.selection == undefined ? document.getSelection().toString() : document.selection.createRange().text;
        if ($.trim(sText)!= "") {
            selectAddTemp();
            if ($("#markTool").size() == 0) {
                var html = '<div id="markTool" class="tag_box select_tag_box">'
                                +'<div class="tag_box_con">'
                                    +'<div class="tag_box_con_l">'
                                        +'<div class="interesting" onmousedown="markBeginNewTwo(0)" tabindex="1"><span></span></div>'
                                        +'<div class="nonsense" onmousedown="markBeginNewTwo(1)" tabindex="1"><span></span></div>'                
                                    +'</div>'
                                    +'<div class="tag_box_con_r">'
                                        +'<div class="comment_con">'
                                            +'<div class="textarea_box">'
                                                +'<div class="sendMarkText"></div>'
                                                +'<textarea placeholder="说点什么咯！" onpaste="markPaste(this,0)"></textarea>'
                                                +'<em onmousedown="markBeginNewTwo(2)"></em>'
                                            +'</div>'
                                        +'</div>'
                                        +'<div class="no_comment"><span></span>还没有人说过什么，赶紧的。</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                $(".read_body").append(html);

            }
            $(".mark_layer").show();
            $("#markTool").stop().css({"top": e.pageY + 20}).fadeIn(300);                      
            $(".show_tag").hide();
            $(".show_tag em").removeClass("comment_y");
            $("#markTool textarea").css("height","36px");
            $("#markTool .textarea_box").css("height","38px");
            $("#markTool textarea").val("");
            $("#markTool .sendMarkText").removeClass("sendMarkTextOk");
        }
    },1);
});
/*$(document).on("blur", "#markTool", function () {
    $(this).hide();
});*/
/*$("*").mousedown(function (e) {
    var target = $(e.target);
    if(target.closest("#markTool").length == 0){
        // $("#markTool").hide();
        closeBox();
    }
});*/
var href = location.href;
var str = href.substring(href.indexOf("guser=")+6,href.length);
var guser = str.substring(0,str.indexOf("&"));
var str = href.substring(href.indexOf("fuser=")+6,href.length);
var fuser = str.substring(0,str.indexOf("&"));
var str = href.substring(href.indexOf("url=")+4,href.length);
var url = str.substring(0,str.length);
function markBegin() {
    $("#markTool").hide();
    $("#markTool em").removeClass("comment_y");
    replace("temp");
    var markinfo = Array();
    var index = 0;
    for (x = 0; x < $("temp").size() ; x++) {
        if ($("temp").eq(x).text() != "") {
            markinfo[index] = $("temp").eq(x).text();
            index++;
        }
    }

    markinfo = JSON.stringify(markinfo);
}
/**
 * zhang.lulu(2015/10/15)
 * 选完之后就把选中内容加临时标签
 */
function selectAddTemp(){
    document.getElementById("read_content_div").contentEditable = true;
    document.execCommand('FontName',false,'nrj_tep');//把选中的元素添加A标签 并且设置临时链接地址来标识
    document.getElementById("read_content_div").contentEditable = false;
    $("font[face='nrj_tep']").css({"font-family":"inherit","background-color":"#338FFF","color":"#FFFFFF"});
}
/**
 * zhang.lulu(2015/10/15)
 * 判断选中内容是否合格
 */
function checkSelect(tagName){
    var dom = $("font[face='nrj_tep']");
    var domSize = dom.size();
    var size = $(tagName).size();
    var tlength = 0;
    for (x = 0; x < domSize; x++) {
        tlength += dom.eq(x).text().length;
    }
    if (tlength < 5 || tlength > 500) {
        for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
        }
        showError("标注无效：请选择5-500之间的文字数");
        return false;
    }
    if (dom.parents("nrjmark").size() == 0 && dom.find("nrjmark").size() == 0) {
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith("<" + tagName + " >" + dom.eq(x).html() + "</" + tagName + ">");
        }
        return true;
    }
    else {
        for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
        }
        showError("标注无效：重复的标注内容");
        return false;
    }
}
function replaceNew(tagName) {
    if($(tagName).size()!=0){
        return true;
    }
    if(checkBrowser()!="sougou"){
    document.getElementById("read_content_div").contentEditable = true;
    document.execCommand('FontName',false,'nrj_tep');//把选中的元素添加A标签 并且设置临时链接地址来标识
    document.getElementById("read_content_div").contentEditable = false;
    }
    dom = $("font[face='nrj_tep']");
    var domSize = dom.size();
    var size = $(tagName).size();
    var tlength = 0;
    for (x = 0; x < domSize; x++) {
        tlength += dom.eq(x).text().length;
    }
    if (tlength < 5 || tlength > 500) {
       for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
       }
       showError("标注无效：请选择5-500之间的文字数");
       return false;
    }
    if (dom.parents("nrjmark").size() == 0 && dom.find("nrjmark").size() == 0) {
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith("<" + tagName + " >" + dom.eq(x).html() + "</" + tagName + ">");
        }
        return true;
    }
    else {
       for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
       }
       showError("标注无效：重复的标注内容");
       return false;
    }
}

$(".addMarkBoxPenTollType span").click(function () {
    if ($(this).attr("class").indexOf("On") < 0) {
        var className = $(this).attr("class");
        for (x = 0; x < $(".addMarkBoxPenTollType span").size() ; x++) {
            $(".addMarkBoxPenTollType span").eq(x).attr("class", $(".addMarkBoxPenTollType span").eq(x).attr("class").substring(0, $(".addMarkBoxPenTollType span").eq(x).attr("class").indexOf("On")));
        }
        $(this).attr("class", className + "On").addClass("On");;
    }
})
$(".addMarkBoxPenTollCollor span").click(function () {
    if ($(this).attr("class").indexOf("On") < 0) {
        var className = $(this).attr("class");
        for (x = 0; x < $(".addMarkBoxPenTollCollor span").size() ; x++) {
            if ($(".addMarkBoxPenTollCollor span").eq(x).attr("class").indexOf("On") >= 0) {
                $(".addMarkBoxPenTollCollor span").eq(x).attr("class", $(".addMarkBoxPenTollCollor span").eq(x).attr("class").substring(0, $(".addMarkBoxPenTollCollor span").eq(x).attr("class").indexOf("On")));
            }
        }
        $(this).attr("class", className + "On").addClass("On");
    }
})

function closeBox() {
    $("#addMarkBox").hide();
    dom = $("temp");
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith(dom.eq(x).html());
    }
}

function addMark() {
    var markclassname = "mark";
    var markid = "";
    if ($(".addMarkBoxPenTollType .On").index(".addMarkBoxPenTollType span") == 0) {
        markclassname += "Pen";
    } else {
        markclassname += "Line";
    }
    switch ($(".addMarkBoxPenTollCollor .On").attr("class")) {
        case "addMarkBoxPenTollCollorPinkOn On":
            markclassname += "Pink";
            break;
        case "addMarkBoxPenTollCollorBlackOn On":
            markclassname += "Black";
            break;
        case "addMarkBoxPenTollCollorBlueOn On":
            markclassname += "Blue";
            break;
        case "addMarkBoxPenTollCollorYellowOn On":
            markclassname += "Yellow";
            break;
        case "addMarkBoxPenTollCollorRedOn On":
            markclassname += "Red";
            break;
    }
    var markinfo = Array();
    var replace = Array();
    for (x = 0; x < $("temp").size() ; x++) {
        if ($("temp").eq(x).html() != "") {
            markinfo[x] = encodeURI($("temp").eq(x).html());
            replace [x]=encodeURI( "<nrjmark class='" + markclassname + "' markid='markid_replace'>" + $("temp").eq(x).html() + "</nrjmark>");
        }
    }
    markinfo = JSON.stringify(markinfo);
    replace = JSON.stringify(replace);
    action({
        type: "post",
        url: "mark/savemark",
        data: { "tokenid": tokenid, "userid": userid, "markclassname": markclassname, "markinfo": markinfo, "url": url, "webid": webid, "replace": replace,"groupid":gid },
        success: function (ret) {
            ret = eval('(' + ret + ')');
            if (ret['id']) {
                markid = ret['id'];
                action({
                    type: "post",
                    url: "mark/savemarktext",
                    data: { "tokenid": tokenid, "userid": userid, "content": $(".addMarkBoxText").val() ? $(".addMarkBoxText").val() : "", "tagID": markid },
                    success: function (ret) {
                        dom = $("temp");
                        var domSize = dom.size();
                        for (x = 0; x < domSize; x++) {
                            dom.eq(x).replaceWith("<nrjmark class='" + markclassname + "' markid='" + markid + "'>" + dom.eq(x).html() + "</nrjmark>");
                        }
                        closeBox();
                        $(".addMarkBoxText").val("");
                        //xuelin
                        $('.tag_success').fadeIn();
                        var timer = setTimeout(function () {
                            $('.tag_success').fadeOut();
                        }, 800)
                        //xuelin
                    }
                });
            }
        }
    })

}
var markId;
if(checkFL()=="webview"){
    $(document).on("click", "nrjmark", function () {
        if ($(this).hasClass("cantsee")) {
            return;
        }
        var markId = $(this).attr("markId");
        var markInfo = getMarkInfo(markId);
        if (checkZD() == "android") {
            try{
                HostApp.alertMarkInfoDialog(markId,markInfo);
            }catch(e){
                HostApp.alertMarkInfoDialog(markId);
            }
        } else if (checkZD() == "iphone") {
            location.href = "IOS:::showMark:::" + markId +":::"+markInfo;
            var message = {
                "func": "showMark",
                "markId":markId,
                "markInfo":markInfo
            }
            window.webkit.messageHandlers.webViewApp.postMessage(message);
        }
    })
}else{
    $(document).on("click", "nrjmark", function (e) {
        $("#markTool").hide();
        $(".show_tag em").removeClass("comment_y");
        showMarkLayer();
        markId = $(this).attr("markId");
        $(".show_tag").css({"top":e.pageY+20});
        $(".show_tag").attr("markId", markId);
        $(".show_tag").show();
        getMarkAllInfo(markId);
    });
}
$(document).on("click","nrjmark a",function(){
    $(this).parent("nrjmark").click();
    return false;
})
/*为android和ios获取标注内容*/
function getMarkInfo(markId){
    var markInfo = "";
    $("nrjmark[markid="+markId+"]").each(function(){
        markInfo += $(this).text();
    })
    var str = $(".air_bubble_circle[markid="+markId+"]").text();
    markInfo = markInfo.replace(str,"");
    return markInfo;
}
var isGetMarkContentList = true;
function getMarkContentList(markId) {
    if(!isGetMarkContentList){
        return false;
    }
    isGetMarkContentList = false;
    action({
        type: "post",
        url: "/mark/getmarkcontendlist",
        data: { "tokenid": tokenid, "userid": userid, "tagID": markId },
        success: function (ret) {
            isGetMarkContentList = true;
            var retObj = eval("(" + ret + ")");
            var str = "";
            var src = "";
            var onerror = "";
            var date;
            var audioWidth;
            if (!retObj['errorCode']) {
                for (var i = 0; i < retObj.length; i++) {
                    date = getTime(retObj[i]['time'], "ydmhm");
                    src = "/userface/" + retObj[i]["user"] + "_thumb.jpg";
                    onerror = "javascript:this.src='/images/photo.png'";
                    audioWidth = getAudioPlayerWidth(retObj[i]['audioTime']);
                    if (retObj[i]['audioName']) {
                        var audioSrc = "audio/" + retObj[i]['audioName'];
                        var markcontent = '<div class="markAudio" style="width:' + audioWidth + 'px!important">'
											+ '<img class="audioPlaying_j" src="/images/audio_playing.png">'
											+ '<img class="audioPlaying_d" src="/images/audioPlaying.gif">'
											+ '<div class="audioTime">' + getAudioTime(retObj[i]['audioTime']) + '</div>'
											+ '<audio class="audioPlayer" id="audio' + retObj[i]['id'] + '" src="' + audioSrc + '" controls></audio>'
											+ '</div>';
                        var markContentType = "audio";
                    } else {
                        var markcontent = retObj[i]['content'].replace(new RegExp("\n", 'g'), "<br>");
                        var markContentType = "text";
                    }
                    if (retObj[i]['user'] == userid || userid == guser || userid == fuser) {
                        var delMarkContent = '<div class="delMarkContent"></div>';
                    } else {
                        var delMarkContent = "";
                    }
                    str += '<li contentId="' + retObj[i]['id'] + '" type="' + markContentType + '">'
						+ '<div class="userFace"><img src="' + src + '" onerror="' + onerror + '" /></div>'
						+ '<div class="markInfo">'
						+ '<div class="markInfo_user">'
						+ '<span class="userName" title="'+retObj[i]['userName']+'">' + getShort(retObj[i]['userName'],8,"...") + '</span>'
						+ '<span class="markTime">' + date + '</span>'
						+ delMarkContent
						+ '</div>'
						+ '<div class="markInfo_content">' + markcontent + '</div>'
						+ '</div>'
						+ '</li>';
                }
                $(".markList ul").html(str);
                $(".markList_loading").hide();
                $(".addNewMarkContent").show();
            } else {
                if (retObj['errorMessage'] == "can't find list") {
                    $(".markList_loading").html("没有标注内容");
                    $(".addNewMarkContent").show();
                } else {
                    alert(retObj['errorMessage']);
                }
            }
        }
    });
    $(".markList_box_big").focus();
}

$(".addNewMarkContent").click(function () {
    if ($(".markList_box_big").height() < 255) {
        $(".noShowDiv").height(255 - $(".markList_box_big").height()).show();
    }
    $(".addNewMarkContentMask").show();
    //xuelin
    var addMark=document.getElementById('addMark');
    addMark.select();
    $(".markList_box_big").find('textarea').val("");
    //xuelin
});
var isOpen=true;
$(".okAddNewMarkContent").click(function () {
    if(isOpen){
    isOpen = false;
    var content = $(".addNewMarkContentDiv textarea").val();
    var markId = $(".markList_box_big").attr("markId");
    action({
        type: "post",
        url: "mark/savemarktext",
        data: { "tokenid": tokenid, "userid": userid, "content": content, "tagID": markId, },
        success: function (ret) {
            var retObj = eval("(" + ret + ")");
            if (!retObj['errorCode']) {
                var userName = personName;
                var src = "/userface/" + userid + "_thumb.jpg";
                var onerror = "javascript:this.src='/images/photo.png'";
                var date = "";
                var str = '<li contentId="' + retObj['id'] + '" type="text">'
                    + '<div class="userFace"><img src="' + src + '" onerror="' + onerror + '" /></div>'
                    + '<div class="markInfo">'
                    + '<div class="markInfo_user">'
                    + '<span class="userName">' + getShort(userName,8,"...") + '</span>'
                    + '<span class="markTime">' + getCurrentTime("ydmhm") + '</span>'
                    + '<div class="delMarkContent"></div>'
                    + '</div>'
                    + '<div class="markInfo_content">' + html_encode(content) + '</div>'
                    + '</div>'
                    + '</li>';
                $(".markList ul").prepend(str);
                $(".addNewMarkContentMask").hide();
                $(".noShowDiv").hide();
                if ($(".markList_loading").html() == "没有标注内容") {
                    $(".markList_loading").hide();
                }
            } else {
                alert("mark/savemarktext:" + retObj['errorMessage']);
            }
            isOpen = true;
        }
    });
    }
});

$(".cancelAddNewMarkContent").click(function () {
    $(".addNewMarkContentMask").hide();
    $(".noShowDiv").hide();
});

/*$("*").click(function (e) {
    var target = $(e.target);
    if (target.closest(".markList_box_big").length == 0) {
        $(".markList_box_big").hide();
        $(".noShowDiv").hide();
    }
})*/

$(document).on("click", ".delMarkContent", function () {
    var obj = $(this).parents("li");
    $(".delMarkContentMask").remove();
    var str = '<div class="delMarkContentMask">'
        + '<span class="delMarkContentWord">确认删除标注？</span>'
        + '<div class="cancelDelMarkContent">取消</div>'
        + '<div class="okDelMarkContent">确定</div>'
        + '</div>';
    obj.append(str);
    obj.find(".delMarkContentMask").css({ "line-height": obj.height() + 30 + "px" });
});

$(document).on("click", ".cancelDelMarkContent", function () {
    $(".delMarkContentMask").remove();
});
var isDelMarkContent = true;
$(document).on("click", ".okDelMarkContent", function () {
    if(!isDelMarkContent){
        return false;
    }
    isDelMarkContent = false;
    var liObj = $(this).parents("li");
    var id = liObj.attr("contentId");
    var type = liObj.attr("type");
    var url = "";
    if (type == "text") {
        url = "/mark/deletemarktext";
    } else {
        url = "/mark/deletemarkaudio";
    }
    action({
        type: "post",
        url: url,
        data: { "id": id, "tokenid": tokenid, "userid": userid },
        success: function (ret) {
            var retObj = eval("(" + ret + ")");
            if (!retObj['errorCode'] && retObj['id']) {
                liObj.toggle(function () {
                    liObj.remove();
                    if ($(".markList li").size() == 0) {
                        $(".markList_box_big").hide();
                        dom = $("nrjmark[markid='" + $(".markList_box_big").attr("markid") + "']");
                        var domSize = dom.size();
                        for (x = 0; x < domSize; x++) {
                            dom.eq(x).replaceWith(dom.eq(x).html());
                        }
                    }
                    else {
                        $('.ppt_control').hide();
                    }
                    isDelMarkContent = true;
                });
            } else {
                alert(url + ":" + retObj['errorMessage']);
                isDelMarkContent = true;
            }
        }
    })
});
function showError(text) {
    if ($("body").find("#error").size() == 0) {
        if(checkFL()=="webview"){
            var html = '<div id="error" class="markErrorTip errorApp">' + text + '</div>';
        }else{
            var html = '<div id="error" class="markErrorTip">' + text + '</div>';
        }
        dom = $("body").append(html);
        $("body").find("#error").slideDown(600,function(){
            $('.ppt_control').hide();
        });
        setTimeout(function () {
            $("body").find("#error").slideUp(600, function () {
                $(this).remove();
            /*$('.ppt_control').fadeIn(speed);*/
            });
        }, 1000)
    }
}
/*
* zhang.lulu(移动端)
* app端吧标注内容删完标注也要删掉
* */
function AppDelMarkContentEnd(markId){
    var dom = $(".read_content").find("nrjmark[markid='" + markId + "']");
    $(".air_bubble_circle[markId="+markId+"]").remove();
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith(dom.eq(x).html());
    }
}
/*******************移动端交互*************************/
/**
 * zhang.lulu
 * app端添加临时标签
 */
function addTempMark(){
    document.getElementById("read_content_div").contentEditable = true;
    document.execCommand('FontName',false,'nrj_tep');//把选中的元素添加A标签 并且设置临时链接地址来标识
    document.getElementById("read_content_div").contentEditable = false;
    dom = $("font[face='nrj_tep']");
    var domSize = dom.size();
    var tlength = 0;
    for (x = 0; x < domSize; x++) {
        tlength += dom.eq(x).text().length;
    }
    if (tlength < 5 || tlength > 500) {
       for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
       }
       showError("标注无效：请选择5-500之间的文字数");
       closeBar();
       return false;
    }
    var tagName = "temp";
    if (dom.parents("nrjmark").size() == 0 && dom.find("nrjmark").size() == 0) {
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith("<" + tagName + " >" + dom.eq(x).html() + "</" + tagName + ">");
        }
    }
    else {
       for (x = 0; x < domSize; x++) {
           dom.eq(x).replaceWith(dom.eq(x).html());
       }
       showError("标注无效：重复的标注内容");
       closeBar();
       return false;
    }

    var markinfo = Array();
    var replace = Array();
    var markpos = Array();
    var html =encodeURI($(".read_content").html());
    for (x = 0; x < $("temp").size() ; x++) {
        if ($("temp").eq(x).html() != "") {
            markinfo[x] = encodeURI($("temp").eq(x).html());
            replace [x]= encodeURI("<nrjmark class='nrjMarkClassName' markid='markid_replace'>" + $("temp").eq(x).html() + "</nrjmark>");
            // 标注位置
            html = html.substring(0,html.indexOf(encodeURI("<temp>")+markinfo[x]));
            markpos[x] = html.split(markinfo[x]).length;
        }
    }
    markpos = JSON.stringify(markpos);
    markinfo = JSON.stringify(markinfo);
    replace = JSON.stringify(replace);

    if (checkZD() == "android"){
        try{
            HostApp.startFileMark(markinfo,replace,markpos);
        }catch(e){
            HostApp.startFileMark(markinfo,replace);
        }
    }else if(checkZD() == "iphone"){
        // location.href = "IOS:::startMark:::" + markinfo + ":::" +replace;
        location.href = "IOS:::openMarkBox";
        var message = {
            "func": "getMarkInfo",
            "markinfo":markinfo,
            "replace":replace,
            "markpos":markpos
        }
        window.webkit.messageHandlers.webViewApp.postMessage(message);
    }
    return false;
}

function closeBar(){
    if (checkZD() == "android"){
        HostApp.setViewState();
    }else if(checkZD() == "iphone"){
        location.href = "IOS:::hideBar";
        var message = {
            "func": "hideBar"
        }
        window.webkit.messageHandlers.webViewApp.postMessage(message);
    }
}

/**
 * zhang.lulu
 * app端去掉临时标签
 */
function closeTemp(){
    dom = $(".read_content").find("temp");
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith(dom.eq(x).html());
    }
}
/*
 * zhang.lulu
 * app端保存标注成功后返回的东西
 * */
function changeMark(markId, markClassName) {
    //alert("markId:" + markId + ";markClassName" + markClassName);
    if (markId == -1) {
        //alert("标注失败");
    } else {
        /*把临时标签换成nrjmark标签*/
       /* dom = $(".read_content").find("temp");
        var domSize = dom.size();
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith("<nrjmark class='" + markClassName + "' markid='" + markId + "'>" + dom.eq(x).html() + "</nrjmark>");
        }*/
        showSelected(markId);
    }
}
/**
 * zhang.lulu
 * 安卓端标注完成后显示标注
 */
function changeMarkAndroid(markId, markClassName) {
    // alert("markId:" + markId + ";markClassName" + markClassName);
    if (markId == -1) {
        //alert("标注失败");
    } else {
        /*把临时标签换成nrjmark标签*/
        document.getElementById("read_content_div").contentEditable = true;
        document.execCommand('CreateLink', false, "temporaryUrlSet");//把选中的元素添加A标签 并且设置临时链接地址来标识
        document.getElementById("read_content_div").contentEditable = false;
        dom = $("a[href='temporaryUrlSet']");
        var domSize = dom.size();
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith("<nrjmark class='" + markClassName + "' markid='" + markId + "'>" + dom.eq(x).html() + "</nrjmark>");
        }
    }
}
/**
 * zhang.lulu
 * ios存mark和marktext
 */
function iosSaveMark(markText,markClassName){
    var markText = decodeURIComponent(markText);
    var markinfo = Array();
    var replace = Array();
    for (x = 0; x < $("temp").size() ; x++) {
        if ($("temp").eq(x).html() != "") {
            markinfo[x] = encodeURI($("temp").eq(x).html());
            replace [x]= encodeURI("<nrjmark class='"+markClassName+"' markid='markid_replace'>" + $("temp").eq(x).html() + "</nrjmark>");
        }
    }
    markinfo = JSON.stringify(markinfo);
    replace = JSON.stringify(replace);

    var href = location.href;

    var str = href.substring(href.indexOf("tokenid=")+8,href.length);
    var tokenid = str.substring(0,str.indexOf("&"));

    var str = href.substring(href.indexOf("userid=")+7,href.length);
    var userid = str.substring(0,str.indexOf("&"));

    var str = href.substring(href.indexOf("gid=")+4,href.length);
    var gid = str.substring(0,str.indexOf("&"));

    var str = href.substring(href.indexOf("webid=")+6,href.length);
    var webid = str.substring(0,str.indexOf("&"));

    var str = href.substring(href.indexOf("url=")+4,href.length);
    var url = str.substring(0,str.length);
    url = decodeURIComponent(url); //对ios端url十六进制解码

    // alert("tokenid:"+tokenid+";userid:"+userid+";webid:"+webid+";url"+url);
    var markid;
    action({
        type: "post",
        url: "mark/savemark",
        data: { "tokenid": tokenid, "userid": userid, "markclassname": markClassName, "markinfo": markinfo, "url": url, "webid": webid, "replace": replace,"groupid":gid },
        success: function (ret) {
            ret = eval('(' + ret + ')');
            if (ret['id']) {
                markid = ret['id'];
                action({
                    type: "post",
                    url: "mark/savemarktext",
                    data: { "tokenid": tokenid, "userid": userid, "content": markText, "tagID": markid },
                    success: function (ret) {
                        var dom = $("temp");
                        var domSize = dom.size();
                        for (x = 0; x < domSize; x++) {
                            dom.eq(x).replaceWith("<nrjmark class='" + markClassName + "' markid='" + markid + "'>" + dom.eq(x).html() + "</nrjmark>");
                        }
                    }
                });
            }
        }
    })
}
/**
 * zhang.lulu
 * 判断搜狗浏览器
 * 注：搜狗浏览器在按下标注的时候选中已经消失
 */
function checkBrowser(){
    var explorer = window.navigator.userAgent;
    if(explorer.indexOf("SE")>=0 && explorer.indexOf("MetaSr")>=0){
        return "sougou";
    }
    return "";
}
/************************************新版标注****************************************/
/* xuelin 标注和展示弹出框更改 start */
$(document).on("click",".tag_box_con .comment",function(){
    $(".comment_con .sendMarkText").removeClass("sendMarkTextOk");
    $(".comment_con textarea").val("");
    $(this).parent().siblings('.comment_con').slideToggle();
});
/* xuelin 标注和展示弹出框更改 end */
/**
 * zhang.lulu
 * 开始标注
 * code:0有意思、1瞎扯淡、2有话说
 * 注：该方法web和ios共用
 */
function markBeginNew(code){
    if(code!=2){
        if(replaceNew("temp")){
            saveMark(code,"");
        }else{
            if(checkZD()=="iphone"){
                location.href = "IOS:::flagviewRemoveFromSuperView";
            }else{
                $("#markTool").hide();
                $("#markTool em").removeClass("comment_y");
            }
        }
    }else{
        if($("temp").size()==0){
            if(!replaceNew("temp")){
                if(checkZD()=="iphone"){
                    location.href = "IOS:::flagviewRemoveFromSuperView";
                }else{
                    $("#markTool").hide();
                    $("#markTool em").removeClass("comment_y");
                }
            }
        }
    }
}
/**
 * zhang.lulu(2015/10/15)
 * 开始标注新版
 * code:0有意思、1瞎扯淡、2有话说
 */
function markBeginNewTwo(code){
    if(code==2){
        if($.trim($("#markTool textarea").val())==""){
            return false;
        }
    }
    if(checkSelect("temp")){
        saveMark(code,"");
    }else{
        $("#markTool").hide();
        $("#markTool em").removeClass("comment_y");
        $(".mark_layer").hide();
    }
}
/**
 * zhang.lulu
 * 在"选中"弹出框中点击选项
 * code:0有意思、1瞎扯淡、2有话说
 * 注：该方法web和ios共用
 */
var isSaveMark = true;
function saveMark(code,markText) {
    if(!isSaveMark){
        return false;
    }
    isSaveMark = false;
    if(checkZD()=="iphone"){
        var href = location.href;

        var str = href.substring(href.indexOf("tokenid=")+8,href.length);
        tokenid = str.substring(0,str.indexOf("&"));

        var str = href.substring(href.indexOf("userid=")+7,href.length);
        userid = str.substring(0,str.indexOf("&"));

        var str = href.substring(href.indexOf("gid=")+4,href.length);
        gid = str.substring(0,str.indexOf("&"));

        var str = href.substring(href.indexOf("webid=")+6,href.length);
        webid = str.substring(0,str.indexOf("&"));

        var str = href.substring(href.indexOf("url=")+4,href.length);
        url = str.substring(0,str.length);
        url = decodeURIComponent(url); //对ios端url十六进制解码

        var content = decodeURIComponent(markText);
    }else{
        if(code==2){
            var content = $.trim($("#markTool textarea").val());
            if(content==""){
                isSaveMark = true;
                return false;
            }
        }
    }
    var markclassname = "markLineRed";
    var markinfo = Array();
    var replace = Array();
    var markpos = Array();
    var html =encodeURI($(".read_content").html());
    for (x = 0; x < $("temp").size() ; x++) {
        if ($("temp").eq(x).html() != "") {
            markinfo[x] = encodeURI($("temp").eq(x).html());
            replace [x]=encodeURI( "<nrjmark class='" + markclassname + "' markid='markid_replace'>" + $("temp").eq(x).html() + "</nrjmark>");
            // 标注位置
            html = html.substring(0,html.indexOf(encodeURI("<temp>")+markinfo[x]));
            markpos[x] = html.split(markinfo[x]).length;
        }
    }
    markpos = JSON.stringify(markpos);
    markinfo = JSON.stringify(markinfo);
    replace = JSON.stringify(replace);
    // alert("tokenid"+tokenid+";userid"+userid+";markclassname"+markclassname+";markinfo"+markinfo+";url"+url+";webid"+webid+";replace"+replace+";groupid"+gid);
    action({
        type: "post",
        url: "mark/savemark",
        data: { "tokenid": tokenid, "userid": userid, "markclassname": markclassname, "markinfo": markinfo, "url": url, "webid": webid, "replace": replace,"groupid":gid,"markpos":markpos},
        success: function (ret) {
            ret = eval('(' + ret + ')');
            if (ret['id']) {
                var markId = ret['id'];
                if(code==0){
                    markFunny(markId,0,gid);
                }else if(code==1){
                    markBoring(markId,0,gid);
                }else if(code==2){
                    saveMarkText(markId,content,0,gid);
                }
            }
        }
    })
}
/**
 * zhang.lulu
 * 觉得一个标记有意思
 * type：0代表"选中"弹出框点有意思；1代表"点击标注"弹出框点有意思；
 * 注：该方法web和ios共用
 */
function markFunny(markId,type,gid){
    action({
        type:"post",
        url:"/favorite/markfunny",
        data:{"token":tokenid,"uuid":userid,"markid":markId,"group":gid,"isnew":1},
        success:function(ret){
            var json = $.parseJSON(ret);
            if(json['id']){
                if(type==0){
                    showSelected(markId);
                    if(checkZD()=="iphone"){
                        location.href = "IOS:::flagviewRemoveFromSuperView";
                        isSaveMark = true;
                    }else{
                        closeMarkToolBox();
                    }
                }else if(type==1){
                    var date = "刚刚";//getCurrentTime("ydmhm");
                    var userName = personName;
                    var userFace = getUserFace(userid);
                    var onerror = "javascript:this.src='/images/photo.png'";
                    var fromGroup = json['groupName']!=""?"（"+json['groupName']+"）":"";
                    var str ='<li class="isFunny" user="'+userid+'">'
                                +'<div class="tag_list_main">'
                                   +'<img src="'+userFace+'" onerror="'+onerror+'" alt="" class="img-circle">'
                                   +'<div class="list_main_txt">'
                                       +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                       +'<p class="show_tag_interesting">觉得有意思<span></span></p>'
                                   +'</div>'
                                +'</div>'
                                +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    $(".show_tag .tag_list ul").prepend(str);
                    $(".show_tag .interesting").addClass('current');
                    $(".show_tag .interesting i").html(parseInt($(".show_tag .interesting i").html()==""?0:$(".show_tag .interesting i").html())+1);
                    changeButtleToCount(markId,1);
                }
            }
        }
    })
}
/**
 * zhang.lulu
 * 觉得一个标记瞎扯淡
 * type：0代表"选中"弹出框点瞎扯淡；1代表"点击标注"弹出框点瞎扯淡；
 * 注：该方法web和ios共用
 */
function markBoring(markId,type,gid){
    action({
        type:"post",
        url:"/favorite/markboring",
        data:{"token":tokenid,"uuid":userid,"markid":markId,"group":gid,"isnew":1},
        success:function(ret){
            var json = $.parseJSON(ret);
            if(json['id']){
                if(type==0){
                    showSelected(markId);
                    if(checkZD()=="iphone"){
                        location.href = "IOS:::flagviewRemoveFromSuperView";
                        isSaveMark = true;
                    }else{
                        closeMarkToolBox();
                    }
                }else if(type==1){
                    var date = "刚刚";//getCurrentTime("ydmhm");
                    var userName = personName;
                    var userFace = getUserFace(userid);
                    var onerror = "javascript:this.src='/images/photo.png'";
                    var fromGroup = json['groupName']!=""?"（"+json['groupName']+"）":"";
                    var str ='<li class="isBoring" user="'+userid+'">'
                                +'<div class="tag_list_main">'
                                    +'<img src="'+userFace+'" onerror="'+onerror+'" class="img-circle">'
                                    +'<div class="list_main_txt">'
                                        +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                        +'<p class="show_tag_nonsense">觉得虾扯淡<span></span></p>'
                                    +'</div>'
                               +'</div>'
                               +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    $(".show_tag .tag_list ul").prepend(str);
                    $(".show_tag .nonsense").addClass('current');
                    $(".show_tag .nonsense i").html(parseInt($(".show_tag .nonsense i").html()==""?0:$(".show_tag .nonsense i").html())+1);
                    changeButtleToCount(markId,1);
                }
            }
        }
    })
}
/**
 * zhang.lulu
 * 有话说
 * type：0代表"选中"弹出框说话；1代表"点击标注"弹出框说话；
 */
function saveMarkText(markId,content,type,gid){
    action({
        type: "post",
        url: "mark/savemarktext",
        data: { "tokenid": tokenid, "userid": userid, "content": content, "tagID": markId,"group":gid },
        success: function (ret) {
            var json = $.parseJSON(ret);
            if(json['id']){
                if(type==0){
                    showSelected(markId);
                    closeMarkToolBox();
                }else if(type==1){
                    var date = "刚刚";//getCurrentTime("ydmhm");
                    var userName = personName;
                    var delMarkContent = '<div class="del_mark_text_div"><div class="del_mark_text_button" onclick="deleteMarkTextBox('+json['id']+',this)"></div></div>';
                    var userFace = getUserFace(userid);
                    var onerror = "javascript:this.src='/images/photo.png'";
                    var fromGroup = json['groupName']!=""?"（"+json['groupName']+"）":"";
                    var str ='<li class="isText" markTextId="'+json['id']+'">'
                                +'<div class="tag_list_main">'
                                    +'<img src="'+userFace+'" onerror="'+onerror+'" class="img-circle">'
                                    +'<div class="list_main_txt">'
                                        +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                        +'<div>'
                                            +'<p class="show_tag_comment">'+html_encode(content)+'</p>'
                                            +delMarkContent
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    $(".show_tag .tag_list ul").prepend(str);
                    $(".show_tag .comment i").html(parseInt($(".show_tag .comment i").html()==""?0:$(".show_tag .comment i").html())+1);
                    $(".show_tag textarea").val("");
                    // 输入框恢复原状态
					$(".show_tag textarea").css("height","36px");
					$(".show_tag .textarea_box").css("height","38px");
                    $(".show_tag em.sendMarkText").removeClass('comment_y');
                    changeButtleToCount(markId,1);
                }
            }
        }
    });
}
/**
 * zhang.lulu
 * "点击标注"弹出框中的说话发送
 */
function sendMarkText(obj){
    var markId = $(obj).parents(".show_tag").attr("markId");
    var content = $.trim($(".show_tag textarea").val());
    if(content!=""){
        saveMarkText(markId,content,1,gid);
    }
}
/**
 * zhang.lulu
 * 不刷新展示标注选中
 */
function showSelected(markId){
    var dom = $("temp");
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith("<nrjmark class='markLineRed' markid='" + markId + "'>" + dom.eq(x).html() + "</nrjmark>");
    }
    var fontIndex = $(".word_range_con .current").index();
    var fontSize="";
    if(fontIndex==0){ //小
        fontSize = "fontSize_xiao";
    }else if(fontIndex==1){ //标准
        fontSize = "fontSize_biaozhun";
    }else if(fontIndex==2){ //大
        fontSize = "fontSize_da";
    }else if(fontIndex==3){ //特大
        fontSize = "fontSize_teda";
    }
    $("nrjmark[markId="+markId+"]:last").append('<span class="air_bubble_circle '+fontSize+'" markId="'+markId+'" nub="1">'
                                                                +'<span class="air_bubble_count">1</span>人标注'
                                                            +'</span>');
}
/**
 * zhang.lulu
 * 取消标记有意思
 */
function markUnFunny(markId){
    action({
        type:"post",
        url:"/favorite/markunfunny",
        data:{"token":tokenid,"uuid":userid,"markid":markId},
        success:function(ret){
            var json = $.parseJSON(ret);
            if(json["allcount"]>=0){
                $(".tag_list li[class='isFunny'][user="+userid+"]").slideUp(function(){
                    $(this).remove();
                    if($(".tag_list li").size()==0){
                        deleteMarkShow(markId);
                        hideShowTagBox();
                    }
                })
                $(".show_tag .interesting").removeClass('current');
                $(".show_tag .interesting i").html(parseInt(($(".show_tag .interesting i").html())-1)==0?"":(parseInt($(".show_tag .interesting i").html())-1));
                changeButtleToCount(markId,0);
            }
        }
    })
}
/**
 * zhang.lulu
 * 取消标记瞎扯淡
 */
function markUnBoring(markId){
    action({
        type:"post",
        url:"/favorite/markunboring",
        data:{"token":tokenid,"uuid":userid,"markid":markId},
        success:function(ret){
            var json = $.parseJSON(ret);
            if(json["allcount"]>=0){
                $(".tag_list li[class='isBoring'][user="+userid+"]").slideUp(function(){
                    $(this).remove();
                    if($(".tag_list li").size()==0){
                        deleteMarkShow(markId);
                        hideShowTagBox();
                    }
                })
                $(".show_tag .nonsense").removeClass('current');
                $(".show_tag .nonsense i").html((parseInt($(".show_tag .nonsense i").html())-1)==0?"":(parseInt($(".show_tag .nonsense i").html())-1));
                changeButtleToCount(markId,0);
            }
        }
    })
}
/**
 * zhang.lulu
 * 删除有话说
 */
function deleteMarkText(markTextId){
    action({
        type: "post",
        url: "/mark/deletemarktextv2",
        data: { "id": markTextId, "tokenid": tokenid, "userid": userid ,"group":gid},
        success: function (ret) {
            var json = $.parseJSON(ret);
            if(json["allcount"]>=0){
                $(".tag_list li[class='isText'][markTextId="+markTextId+"]").slideUp(function(){
                    $(this).remove();
                    if($(".tag_list li").size()==0){
                        deleteMarkShow(markId);
                        hideShowTagBox();
                    }
                })
                $(".show_tag .comment i").html((parseInt($(".show_tag .comment i").html())-1)==0?"":(parseInt($(".show_tag .comment i").html())-1));
                changeButtleToCount(markId,0);
            }
        }
    })
}
/**
 * zhang.lulu
 * 标注展示列表被删完把列表框隐藏
 */
function hideShowTagBox(){
    $(".show_tag").hide();
    $(".mark_layer").hide();
}
/**
 * zhang.lulu
 * "点击标注"弹出框中的有意思
 */
function clickFunny(obj){
    var markId = $(obj).parents(".show_tag").attr("markId");
    if($(".show_tag .interesting").hasClass("current")){
        markUnFunny(markId);
    }else{
        markFunny(markId,1,gid);
    }
}
//xuelin +1、-1效果
/*$('.tag_box_con div').click(function(event) {
    $(this).find('.one').remove();
    $(this).append('<b class="one"></b>');
    if($(this).hasClass('current')){
        $(this).children('.one').html('-1').css({'color':'#ffffff'});
        $(this).children('.one').stop().fadeIn(400,function(){
            $(this).css({'transform':'scale(1.5)','-webkit-transform':'scale(1.5)','-moz-transform':'scale(1.5)','-ms-transform':'scale(1.5)'});
            $(this).stop().animate({'top':40},400,function(){
                 $(this).stop().fadeOut().remove();
            });
        });
    }
    else{
        $(this).children('.one').html('+1');
        $(this).children('.one').stop().fadeIn(400,function(){
            $(this).css({'transform':'scale(1.5)','-webkit-transform':'scale(1.5)','-moz-transform':'scale(1.5)','-ms-transform':'scale(1.5)','color':'#E05A26'});
            $(this).stop().animate({'top':-30},400,function(){
                 $(this).stop().fadeOut().remove();
            });
        });
    }
});
$('.tag_box_con .comment').click(function(event) {
    $(this).children('.one').remove();
});*/
$(document).on('click','.sendMarkTextOk',function(){
    $(this).parents('.comment_con').siblings().children('.comment').append('<b class="one">+1</b>');
    $(this).parents('.comment_con').siblings().children('.comment').children('.one').css('color','#E05A26').stop().fadeIn(400,function(){
        $(this).css({'transform':'scale(1.5)','-webkit-transform':'scale(1.5)','-moz-transform':'scale(1.5)','-ms-transform':'scale(1.5)'});
        $(this).stop().animate({'top':-30},400,function(){
             $(this).stop().fadeOut().remove();
        });
    });
});
$(document).on('click','.del_mark_text_box_ok',function(){
    $(this).parents('.tag_list').siblings().children('.comment').append('<b class="one">-1</b>');
    $(this).parents('.tag_list').siblings().children('.comment').children('.one').css('color','#ffffff').stop().fadeIn(400,function(){
        $(this).css({'transform':'scale(1.5)','-webkit-transform':'scale(1.5)','-moz-transform':'scale(1.5)','-ms-transform':'scale(1.5)'});
        $(this).stop().animate({'top':40},400,function(){
             $(this).stop().fadeOut().remove();
        });
    });    
})
/**
 * zhang.lulu
 * "点击标注"弹出框中的瞎扯淡
 */
function clickBoring(obj){
    var markId = $(obj).parents(".show_tag").attr("markId");
    if($(".show_tag .nonsense").hasClass("current")){
        markUnBoring(markId);
    }else{
        markBoring(markId,1,gid);
    }
}
/**
 * zhang.lulu
 * 删除有话说弹出胶囊
 */
function deleteMarkTextBox(markTextId,obj){
    $(".del_mark_text_box").remove();
    var divObj = $(obj).parent(".del_mark_text_div");
    divObj.append('<div class="del_mark_text_box"><button class="del_mark_text_box_ok" onclick="deleteMarkText('+markTextId+')">确定</button><button class="del_mark_text_box_cancel" onclick="cancelDelMarkText()">取消</button></div>');
    $(".del_mark_text_box").show();
    $(".del_mark_text_box").animate({"left":"0px"});
}
function cancelDelMarkText(){
    $(".del_mark_text_box").animate({"left":"90px"},function(){
        $(".del_mark_text_box").remove();
    });
}
/**
 * zhang.lulu
 * 获取标记，有意思数量、瞎扯淡数量、有话说数量、列表
 */
function getMarkAllInfo(markId){
    $(".show_tag textarea").val("");
    $(".show_tag textarea").css("height","36px");
    $(".show_tag .textarea_box").css("height","38px");
    $(".show_tag .sendMarkText").removeClass("sendMarkTextOk");
    $(".show_tag .interesting").removeClass('current');
    $(".show_tag .nonsense").removeClass('current');
    $(".show_tag .comment").removeClass('current');
    $(".show_tag .interesting i").html("");
    $(".show_tag .nonsense i").html("");
    $(".show_tag .comment i").html("");
    $(".show_tag .tag_list ul").html("");
    action({
        type:"post",
        url:"/favorite/getmarkfunnycount",
        data:{"token":tokenid,"uuid":userid,"markid":markId},
        success:function(ret){
            var json = $.parseJSON(ret);
            var count = json['nub']>0?json['nub']:"";
            var inthelist = json['inthelist'];
            $(".show_tag .interesting i").html(count);
            if(inthelist==1){
                $(".show_tag .interesting").addClass('current');
            }
        }
    })
    action({
        type:"post",
        url:"/favorite/getmarkboringcount",
        data:{"token":tokenid,"uuid":userid,"markid":markId},
        success:function(ret){
            var json = $.parseJSON(ret);
            var count = json['nub']>0?json['nub']:"";
            var inthelist = json['inthelist'];
            $(".show_tag .nonsense i").html(count);
            if(inthelist==1){
                $(".show_tag .nonsense").addClass('current');
            }
        }
    })
    /*action({
        type:"post",
        url:"/favorite/getmarktextcount",
        data:{"token":tokenid,"uuid":userid,"markid":markId},
        success:function(ret){
            var json = $.parseJSON(ret);
            var count = json['nub']>0?json['nub']:"";
            var inthelist = json['inthelist'];
            $(".show_tag .comment i").html(count);
            if(inthelist==1){
                $(".show_tag .comment").addClass('current');
            }
        }
    })*/
    var begin = 0;
    var nub = 10;
    $(".tag_list").attr("markId",markId);
    getMarkContentListNew(markId,begin,nub,type);
}
/**
 * zhang.lulu
 * 获取标注评论列表(包括有意思、瞎扯淡、有话说)
 * type:0代表第一次加载;1代表加载更多
 */
function getMarkContentListNew(markId,begin,nub,loadType){
    action({
        type: "post",
        url: "/mark/getmarkcontendlistnew",
        data: { "tokenid": tokenid, "userid": userid, "tagID": markId,"begin":begin,"nub":nub},
        success:function(ret){
            var json = $.parseJSON(ret);
            var type;
            var str = "";
            var user,userName,date;
            if(!json['errorCode']){
                $.each(json,function(key,value){
                    type = value['type'];
                    user = value['user'];
                    userName = value['userName'];
                    date = getTime(value['time'], "howLongAgo");
                    var userFace = getUserFace(user);
                    var onerror = "javascript:this.src='/images/photo.png'";
                    var fromGroup = value['group']>0?"（"+value['groupName']+"）":"";
                    if(type==0){  //有话说
                        if((value['user'] == userid) //标注者本人可以删自己
                        || (userid == guser && value['group']==gid) //只是管理员，才能删除自己成员的标注
                        ){
                        // if (value['user'] == userid || userid == guser || userid == fuser) {
                            var delMarkContent = '<div class="del_mark_text_div"><div class="del_mark_text_button" onclick="deleteMarkTextBox('+value['id']+',this)"></div></div>';
                        } else {
                            var delMarkContent = "";
                        }
                        str+='<li class="isText" markTextId="'+value['id']+'">'
                                +'<div class="tag_list_main">'
                                    +'<img src="'+userFace+'" onerror="'+onerror+'" class="img-circle">'
                                    +'<div class="list_main_txt">'
                                        +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                        +'<div>'
                                            +'<p class="show_tag_comment">'+(value['content'].indexOf("emoji")>0?value['content']:html_encode(value['content']))+'</p>'
                                            +delMarkContent
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    }else if(type==1){ //有意思
                        str+='<li class="isFunny" user="'+user+'">'
                                +'<div class="tag_list_main">'
                                   +'<img src="'+userFace+'" onerror="'+onerror+'" alt="" class="img-circle">'
                                   +'<div class="list_main_txt">'
                                       +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                       +'<p class="show_tag_interesting">觉得有意思<span></span></p>'
                                   +'</div>'
                                +'</div>'
                                +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    }else if(type==2){ //瞎扯淡
                        str+='<li class="isBoring" user="'+user+'">'
                                +'<div class="tag_list_main">'
                                    +'<img src="'+userFace+'" onerror="'+onerror+'" class="img-circle">'
                                    +'<div class="list_main_txt">'
                                        +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                        +'<p class="show_tag_nonsense">觉得虾扯淡<span></span></p>'
                                    +'</div>'
                               +'</div>'
                               +'<div class="tag_list_time">'+date+'</div>'
                            +'</li>';
                    }
                })
                if(loadType==0){
                    $(".show_tag .tag_list ul").html(str);
                }else{
                    $(".show_tag .tag_list ul").append(str);
                }
                showMarkLayer();
                loadMarkContentList = true;
            }
        }
    })
}
/**
 * 滚动加载
 */
var loadMarkContentList = true;
$(".tag_list").scroll(function(){
    if(parseInt($(".tag_list").height()+$(".tag_list").scrollTop())>parseInt($(this)[0].scrollHeight-20)){
        if(loadMarkContentList){
            loadMarkContentList = false;
            var markId = $(".tag_list").attr("markId");
            var begin = $(".tag_list li").size();
            var nub = 10;
            getMarkContentListNew(markId,begin,nub,1);
        }
    }
})
$(".mark_layer").click(function (e) {
    var target = $(e.target);
    if (target.closest(".tag_box").length == 0) {
        $(".mark_layer").hide();
        $(".tag_box").hide();
    }
})
$(".mark_layer").click(function (e) {
    var target = $(e.target);
    if(target.closest("#markTool").length == 0 && target.closest(".tag_box").length == 0){
        closeMarkToolBox();
    }
});
/**
 * zhang.lulu
 * 不刷新变更气泡中的标注操作数量
 * operType:1为+1;0为-1;
 * 注：web和ios和android公用
 */
function changeButtleToCount(markId,operType){
    var nub = parseInt($(".air_bubble_circle[markId="+markId+"]").attr("nub"));
    if(operType==1){
        nub = nub+1;
    }else if(operType==0){
        nub = nub-1;
    }
    var count = nub>99?"99+":nub;
    $(".air_bubble_circle[markId="+markId+"]").attr("nub",nub);
    $(".air_bubble_circle[markId="+markId+"]").find(".air_bubble_count").html(count);
}
/**
 * android
 * 变更几人标注条数
 * totalNum:几人标注的总数
 */
function updateHowManyPeopleMark(markId,totalNum){
    var count = totalNum>99?"99+":totalNum;
    $(".air_bubble_circle[markId="+markId+"]").attr("nub",totalNum);
    $(".air_bubble_circle[markId="+markId+"]").find(".air_bubble_count").html(count);
}
function updateHowManyPeopleMarkNew(markId,changeNum){
    var totalNum = parseInt($(".air_bubble_circle[markId="+markId+"]").attr("nub"));
    totalNum = totalNum+parseInt(changeNum);
    var count = totalNum>99?"99+":totalNum;
    $(".air_bubble_circle[markId="+markId+"]").attr("nub",totalNum);
    $(".air_bubble_circle[markId="+markId+"]").find(".air_bubble_count").html(count);
}
/**
 * zhang.lulu
 * 有意思和、瞎扯淡、有话说都删完的时候删除标注
 * 注：web和ios公用
 */
function deleteMarkShow(markId){
    var dom = $("nrjmark[markid='" + markId + "']");
    $(".air_bubble_circle[markId="+markId+"]").remove();
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith(dom.eq(x).html());
    }
}
/**
 * zhang.lulu
 * 关闭标注工具
 */
function closeMarkToolBox(){
    $("#markTool").hide();
    $("#markTool em").removeClass("comment_y");
    $(".mark_layer").hide();
    var dom = $("temp");
    var domSize = dom.size();
    for (x = 0; x < domSize; x++) {
        dom.eq(x).replaceWith(dom.eq(x).html());
    }
    var dom = $("font[face='nrj_tep']");
    var domSize = dom.size();
    if(domSize>0){
        for (x = 0; x < domSize; x++) {
            dom.eq(x).replaceWith(dom.eq(x).html());
        }
    }
    // 防止重复提交标注
    isSaveMark = true;
}
/**
 * zhang.lulu
 * 有话说输入框
 */
$(document).on("keyup",".show_tag textarea",function(){
    markSendBtnColor(1);
    textHeightAuto(this);
})
$(document).on("keyup","#markTool textarea",function(){
    markSendBtnColor(0);
    textHeightAuto(this);
})
function markPaste(obj,state){
    setTimeout(function(){
        markSendBtnColor(state);
        textHeightAuto(obj);
    }, 2);
}
// 输入框根据输入内容高度自适应
function textHeightAuto(obj){
    var scrollHeight = $(obj).get(0).scrollHeight;
    var height = $(obj).height();
    if(scrollHeight!=height){
        $(obj)[0].style.height = 'auto';
        $(obj)[0].scrollTop = 0; //防抖动
        $(obj).parent(".textarea_box").css({"height":scrollHeight+2});
        $(obj).css({"height":scrollHeight});
    }
}
// 发送按钮颜色变化
function markSendBtnColor(state){
    switch(state){
        case 0:
            // 标注工具输入框
            var content = $.trim($("#markTool textarea").val());
            if(content==""){
                $("#markTool em").removeClass("comment_y");
            }else{
                $("#markTool em").addClass("comment_y");
            }
            break;
        case 1:
            // 标注列表输入框
            var content = $.trim($(".show_tag textarea").val());
            if(content==""){
                $(".show_tag em").removeClass("comment_y");
            }else{
                $(".show_tag em").addClass("comment_y");
            }
            break;
    }
}
/**
 * zhang.lulu
 * 展示遮罩层
 */
function showMarkLayer(){
    $(".mark_layer").height($("body")[0].scrollHeight);
    $(".mark_layer").show();
}

