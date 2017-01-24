/**
 * Created by zhang.lulu on 2015/4/23.
 */
/*字节格式化*/
function byte_format(size, dec) {
    var dec = dec ? dec : 1;
    var a = new Array("B", "KB", "MB", "GB", "TB", "PB");
    var pos = 0;
    var size = new Number(size);
    while (size >= 1024) {
        size /= 1024;
        pos++;
    };
    return size.toFixed(dec) + "" + a[pos];
};
/**
 * js记住cookie和获取cookie
 * 上线后面要加一句+";path=/;domain=nrj.com"
 */
function setCookie(c_name, value, expiredays) {
    time = new Date();
    time = new Date(time.valueOf() + expiredays * 60 * 60 * 1000);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + time.toGMTString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
/*
 * zhang.lulu
 * 将秒转化成y-d-m h:m
 * 格林威治时间和北京时间有8小时的时差
 * */
function getTime(date, type) {
    d = new Date(date * 1000);
    if (type == "ydmhm" || type == "年月日" || type == "ymd" || type == "ydmhms") {
        var year = d.getFullYear();
        var month = +d.getMonth() + 1;
        if (month < 10) { month = "0" + month; }
        var day = d.getDate();
        if (day < 10) { day = "0" + day; }
        var hour = d.getHours();
        if (hour < 10) { hour = "0" + hour; }
        var minute = d.getMinutes();
        if (minute < 10) { minute = "0" + minute; }
        var second = d.getSeconds();
        if (second < 10) { second = "0" + second; }
        if (type == "ydmhm") {
            return year + "-" + month + "-" + day + "&nbsp;&nbsp;" + hour + ":" + minute;
        } else if (type == "ydmhms") {
            return year + "-" + month + "-" + day + "&nbsp;&nbsp;" + hour + ":" + minute + ":" + second;
        } else if (type == "年月日") {
            return year + "年" + month + "月" + day + "日";
        } else if (type == "ymd") {
            return year + "-" + month + "-" + day;
        }
    } else if (type == "howLongAgo") {
        cd = new Date();
        var timeCha = parseInt(cd.getTime() / 1000) - date;
        var str = "";
        if (timeCha < 60) {
            str = "刚刚";
        } else if (timeCha < 3600) {
            str = parseInt(timeCha / 60) + "分钟前";
        } else if (timeCha < 24 * 3600) {
            str = parseInt(timeCha / 3600) + "小时前";
        } else if (timeCha < 48 * 3600) {
            str = "昨天";
        } else if (timeCha < 365 * 24 * 3600) {
            str = parseInt(timeCha / (24 * 3600)) + "天前";
        } else if (timeCha >= 365 * 24 * 3600) {
            str = parseInt(timeCha / (365 * 24 * 3600)) + "年前";
        }
        return str;
    }
}
/*
 * zhang.lulu
 * 获取当前时间
 * 格式：y-d-m h:m
 * */
function getCurrentTime(type) {
    d = new Date();
    var year = d.getFullYear();
    var month = +d.getMonth() + 1;
    if (month < 10) { month = "0" + month; }
    var day = d.getDate();
    if (day < 10) { day = "0" + day; }
    var hour = d.getHours();
    if (hour < 10) { hour = "0" + hour; }
    var minute = d.getMinutes();
    if (minute < 10) { minute = "0" + minute; }
    var second = d.getSeconds();
    if (second < 10) { second = "0" + second; }
    if (type == "ydmhm") {
        return year + "-" + month + "-" + day + "&nbsp;&nbsp;" + hour + ":" + minute;
    } else if (type == "ymdhms") {
        return year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
    } else if (type == "ymd") {
        return year + "-" + month + "-" + day;
    }
}
/*
 * zhang.lulu
 * 将s转为20'30"(分'秒")的格式
 * */
function getAudioTime(duration) {
    var time = "";
    duration = parseInt(duration);
    if (duration <= 60) {
        time = duration + '"';
    } else {
        time = parseInt(duration / 60) + "'" + duration % 60 + '"';
    }
    return time;
}
/**
 * zhang.lulu
 * 判断字符长度：汉字占2个字符,英文占一个字符
 */
var getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
}

//字符串长度：中文和全角符号为1，英文、数字和半角为0.5
var getLength = function(str, shortUrl) {
    str = str + '';
    if (true == shortUrl) {
        // 一个URL当作十个字长度计算
        return Math.ceil(str.replace(/((news|telnet|nttp|file|http|ftp|https):\/\/){1}(([-A-Za-z0-9]+(\.[-A-Za-z0-9]+)*(\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]*)?(\/[-A-Za-z0-9_\$\.\+\!\*\(\),;:@&=\?\/~\#\%]*)*/ig, 'xxxxxxxxxxxxxxxxxxxx')
            .replace(/^\s+|\s+$/ig, '').replace(/[^\x00-\xff]/ig, 'xx').length / 2);
    } else {
        return Math.ceil(str.replace(/^\s+|\s+$/ig, '').replace(/[^\x00-\xff]/ig, 'xx').length / 2);
    }
};
var subStr = function(str, len) {
    if (!str) { return ''; }
    len = len > 0 ? len * 2 : 280;
    var count = 0, //计数：中文2字节，英文1字节
        temp = ''; //临时字符串
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            count += 2;
        } else {
            count++;
        }
        //如果增加计数后长度大于限定长度，就直接返回临时字符串
        if (count > len) { return temp; }
        //将当前内容加到临时字符串
        temp += str.charAt(i);
    }
    return str;
};
/*
 * zhang.lulu
 * 字符最大化出现"..."
 * */
function getShort(text, num, str) {
    if (getLength(text) > num) {
        return subStr(text, num) + str;
    } else {
        return text;
    }
}
/*
 * zhang.lulu
 * 判断访问终端(pc,android,iphone)
 * */
function checkZD() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return "iphone";
    } else if (/(Android)/i.test(navigator.userAgent)) {
        return "android";
    } else {
        if (isWeiXin()) {
            return "wxPc"; // 微信电脑客户端
        } else {
            return "pc";
        }
    }
}

/**
 * zhang.xuelin
 * 根据录音时长获取录音显示宽度
 */
function getAudioPlayerWidth(audioTime) {
    if (audioTime <= 1) {
        audioWidth = 50;
    } else if (audioTime >= 150) {
        audioWidth = 200;
    } else {
        audioWidth = eval('(' + audioTime + ')') + 50;
    }
    return audioWidth;
}
/**
 * zhang.lulu
 * 获取用户图片路径
 */
function getUserFace(userId) {
    return config.userfaceOssSrc + userId + '?' + Math.random();
}
/**
 * zhang.lulu
 * 给网页插入一个script
 */
function webSetScript(src) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(script, head.firstChild);
    return script;
}
/**
 * zhang.lulu
 * 给网页插入一个link
 */
function webSetLink(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(link, head.firstChild);
    return link;
}

function html_encode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}
/**
 * 将常用html字符实体转为字符
 */
function htmlEntityCharToChar(str) {
    var s = "";
    if (str == null) return str;
    if (str.length == 0) return "";
    s = str.replace(/&nbsp;/g, "&"); //一个空格
    s = s.replace(/&lt;/g, "&"); //小于<
    s = s.replace(/&gt;/g, "&"); //大于>
    s = s.replace(/&amp;/g, "&"); //&符号
    s = s.replace(/&quot;/g, "&"); //双引号"
    return s;
}
/**
 * zhang.lulu
 * 验证电话号码合法性
 */
function checkTel(tel) {
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(tel)) {
        return true;
    } else {
        return false;
    }
}
/**
 * zhang.lulu
 * 验证邮箱合法性
 */
function checkEmail(email) {
    if (email.length >= 60) {
        return false;
    }
    // var myreg = /^([a-zA-Z0-9]+[_.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var myreg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (!myreg.test(email)) {
        return false;
    } else {
        return true;
    }
}
/**
 * zhang.lulu
 * 正则验证密码(字母、数字、特殊符号支持~`!@#$%-_,.特殊字符)
 */
function checkPassword(password) {
    //var reg = /^[A-Za-z0-9-`=\\\[\];',\.\/~!@#$%^&*()_+|{}:\"<>?]{6,16}$/;
    var reg = /^[A-Za-z0-9\~\`\!\@\#\$\%\-\_\,\.]{6,16}$/;
    if (password.match(reg)) {
        return true;
    } else {
        return false;
    }
}

// 检测名称(禁止输入下面字符)
function checkName(name) {
    var reg = /[\\|\/:*?"<>|]+/g;
    if (reg.test(name)) {
        return false;
    } else {
        return true;
    }
}


/*
 * zhang.lulu
 * 将选中文字数组转回原样
 * */
function getSelContent(markInfo) {
    var arr = JSON.parse(markInfo);
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        str += arr[i].replace(//g, " ");
    }
    return str;
}
/**
 * zhang.lulu
 * 转义字符为实体
 */
function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var text = div.innerText || div.textContent;
    text = text.replace("&nbsp;", " ");
    return text;
}

function toUrl(url) {
    location.href = url;
    location.reload();
}
/**
 * zhang.lulu
 * 判断浏览器类型
 */
function checkTheBrowser() {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
        // myexplorer="谷歌（或360伪装）"
        return "googleChrome";
    };
    return "";
}
var personName;
var personEmail;
var personTel;
//统计停留时间
var startTime;
var endTime;
var duration = 0;
var come = "";
if (location.href.indexOf("?comeFrom=") > 0) {
    var come = getfrom();
    if (come) {
        startTime = new Date();
        $(window).bind('beforeunload', function(e) {;
            endTime = new Date(); //用户退出时间
            duration = endTime.getTime() - startTime.getTime();
            $.ajax({
                type: 'POST',
                async: false,
                url: 'admin/savetourists',
                data: { duration: duration, come_from: come }
            });
        })

    }
}



function getfrom() {
    var url = location.href;
    var index = url.indexOf("?comeFrom=") + 10;
    var endIndex = url.indexOf("#");
    if (endIndex > 0) {
        var from = url.substring(index, url.indexOf("#"));
    } else {
        var from = url.substring(index);
    }
    return from;
}

/**
 * 封装一个顶部弹窗
 */
function popUpTopBox(boxObj, text) {
    $("#pop-up-top-box").remove();
    boxObj.append('<span id="pop-up-top-box" class="pop-up-top-box">' + text + '</span>');
    $("#pop-up-top-box").css("margin-left", -$("#pop-up-top-box").width() / 2).show();
    setTimeout(function() {
        $("#pop-up-top-box").stop().fadeOut(800);
    }, 1000);
}
/**
 * 登录记录
 */
function loginLog(uuid, token) {
    action({
        type: "post",
        url: "/user/loginlog",
        data: { "uuid": uuid, "token": token, "source": 1 },
        success: function(ret) {
            var json = $.parseJSON(ret);
            // if (json['id']) {
            //     console.log("记录登录成功");
            // }
        }
    });
}
/**
 * 全局变量
 */
window.userfaceonerror = "javascript:this.src='/images/photo.png'";

// 操作正在进行中
function openOperLoading() {
    if ($("#oper-loading").size() == 0) {
        var html = '<div id="oper-loading" style="width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:999999">' +
            '<div style="width:200px;height:100px;position:absolute;top:50%;left:50%;margin-top:-60px;margin-left:-100px;background:rgba(0,0,0,0.6);border-radius:10px;text-align:center;line-height:100px;color:#FFFFFF;">' +
            '操作正在进行中......' +
            '</div>' +
            '</div>';
        $("body").append(html);
    } else {
        $("#oper-loading").show();
    }
}

// 关闭操作进行中提示
function closeOperLoading() {
    $("#oper-loading").hide();
}

// 状态框提示框
function openStateWindow(text) {
    if ($("#state-window").size() == 0) {
        var html = '<div id="state-window" style="width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:999999">' +
            '<div style="width:200px;height:100px;position:absolute;top:50%;left:50%;margin-top:-60px;margin-left:-100px;background:rgba(0,0,0,0.6);border-radius:10px;text-align:center;color:#FFFFFF;">' +
            '<img src="../images/loading.gif" style="margin-top:20px;">' +
            '<p id="state-window-text">' + text + '</p>' +
            '</div>' +
            '</div>';
        $("body").append(html);
    } else {
        $("#state-window-text").html(text);
        $("#state-window").show();
    }
}

// 关闭状态框
function closeStateWindow() {
    $("#state-window").hide();
}

// 打开公共样式弹出框
function openPublicStylePopwindow(id, callback) {
    $("#" + id).css("margin-top", -$("#" + id).height() / 2 - 20).show();
    $("#" + id).find(".error").html("");
    $(".body-mask-layer").show();
    if (callback) {
        callback();
    }
}

// 关闭公共样式弹出框
function closePublicStylePopwindow(id) {
    $("#" + id).hide();
    $(".body-mask-layer").hide();
}

// 无滚动条滚动
function gunlun_event(className) {
    var JSB = $("." + className).get(0);
    if (!JSB)
        return;
    if (JSB.addEventListener) {
        JSB.addEventListener('DOMMouseScroll', function(event) {
            var e = event || window.event;
            e.preventDefault();
            _size = e.detail; //获取滚轮向下还是向上  FF浏览器  -3向上  3为向下
            var a = $(this).scrollTop();
            if (_size > 0) {
                $(this).scrollTop(a + 20);
            } else {
                $(this).scrollTop(a - 20);
            }
        }, false);
    };
    JSB.onmousewheel = function(evt) {
        var e = evt || window.event;
        if (e == evt) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        _size = e.wheelDelta; //获取滚轮向下还是向上  其他浏览器  120向上  -120为向下
        var a = $(this).scrollTop();
        if (_size > 0) {
            $(this).scrollTop(a - 20);
        } else {
            $(this).scrollTop(a + 20);
        }
    };
}

// jquery file upload插件加载次数
var bdfileuploadcount = 0;

// ajax 请求超时时间
var ajax_timeout = 0;
var ajax_timeout_lang = 0;


/**
 * 错误码捕捉
 * @param  boxDom  放置错误的jquery dom对象
 */
function ajax_error(xhr, textStatus, errorThrown, boxDom) {
    // 获取errorCode
    var errorCode = 0;
    try {
        var errorJSON = $.parseJSON(xhr.responseText);
        errorCode = errorJSON.errorCode;
    } catch (e) {
        errorCode = -1;
    }
    // 获取errorCodeInfo
    var errorCodeInfo = Util.getServerError(errorCode);
    if (errorCodeInfo == null) { // 状态码表中还没有此状态码
        errorCodeInfo = errorJSON.errorInfo;
    }
    // 展示错误信息 
    if (boxDom && boxDom.size() > 0) {
        boxDom.html(errorCodeInfo);
    } else {
        Util.showTipModal(errorCodeInfo);
    }
}

/**
 * 获取错误信息
 */
function getAjaxErrorObj(xhr) {
    return $.parseJSON(xhr.responseText);
}

// 给不同的文件大小配不同的单位
function convfilesize(size) {
    if (size < 1024) {
        return size + "B";
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(1) + "KB";
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(1) + "MB";
    } else {
        return (size / 1024 / 1024 / 1024).toFixed(1) + "GB";
    }
}

function getObjByHash(hash) {
    var str = hash.substring(hash.indexOf("?") + 1, hash.length);
    var arr = str.split("&");
    var oneObj;
    var hashObj = {};
    var key, value;
    for (var i = 0; i < arr.length; i++) {
        oneObj = arr[i].split("=");
        hashObj[oneObj[0]] = oneObj[1];
    }
    return hashObj;
}

/**
 * 获取参数对象集合
 * @return object params 参数对象
 */
function getQueryParam() {
    var params = {};
    var queryString = location.href.split('?');
    // 无param
    if (queryString.length === 1) {
        return null;
    }
    if (queryString.length === 2 && queryString[1].indexOf("http") != -1) { // 正常情况
        var queryArr = queryString[1].split('&');
    } else {
        var href_new = location.href.substring(location.href.indexOf("?") + 1, location.href.length);
        var queryString_new = href_new;
        // 微信分享会在#前加?from=singlemessage
        if (href_new.substring(0, href_new.indexOf("#")) != "") {
            queryString_new = href_new.substring(href_new.indexOf("?") + 1, href_new.length);
            queryString_new = href_new.substring(0, href_new.indexOf("#")) + "&" + queryString_new;
        }
        // 如果链接中有另外一个链接
        if (queryString_new.indexOf("http") != -1) {
            queryString_new = queryString_new.substring(0, queryString_new.indexOf("http")) +
                encodeURIComponent(queryString_new.substring(queryString_new.indexOf("http"), queryString_new.length));
        }
        var queryArr = queryString_new.split('&');
    }
    for (var i = 0; i < queryArr.length; i++) {
        var query = queryArr[i].split('=');
        var key = query[0];
        var value = query[1];
        params[key] = value;
    }
    return params;
}

function getQueryParamByUrl(url) {
    var params = {};
    var queryString = url.split('?');
    // 无param
    if (queryString.length === 1) {
        return null;
    }
    var queryArr = queryString[1].split('&');
    for (var i = 0; i < queryArr.length; i++) {
        var query = queryArr[i].split('=');
        var key = query[0];
        var value = query[1];
        params[key] = decodeURI(value);
    }
    return params;
}

// 文档支持
var docSupportTypes = [
    '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'
];
// 图片支持
var imgSupportTypes = [
        '.png', '.bmp', '.jpg', '.jpeg', '.gif'
    ]
    // 视频支持
var vidioSupportTypes = [
    '.mov',
    '.mp4', '.m4v',
    '.wmv', '.avi', '.asf',
    '.rmvb', '.rm',
    '.mpeg', '.mpg',
    '.3gp', '.mkv', '.flv', '.dat', '.ram', '.vob', '.mod', '.dv', '.qt', '.ts', '.webm'
];
// 音频支持
var audioSupportTypes = [
    '.mp3', '.wav', '.aac', '.m4a', '.flac', '.wma', '.ape', '.ogg', '.mid'
];
// txt支持
var txtSupportTypes = [
    '.txt'
];
//pdf支持
var pdfSupportTypes = [
    '.pdf'
];

/**
 * 判断是否是微信
 * @return {Boolean} [description]
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

// 初始化语言
var language = sessionStorage.getItem("language") ? sessionStorage.getItem("language") : "ch";
$(function() {
    if (language == "ch") {
        $("#language").html("当前中文");
    } else if (language == "en") {
        $("#language").html("当前英文");
    }
})

// 语言切换开关
function languageSwitch() {
    if ($("#language").html() == "当前中文") {
        sessionStorage.setItem("language", "en");
        location.reload();
    } else {
        sessionStorage.setItem("language", "ch");
        location.reload();
    }
}

// 根据索引获取对应语言
function getLanguageByKey(key) {
    return languagePack[key][language];
}

// 获取模板
function templateLoad(obj, url, callback) {
    $.ajax({
        type: "get",
        url: url,
        success: function(ret) {
            // 匹配版本号
            var ret = ret.replace(/{{version}}/g, version);

            // 匹配国际化
            p = /{{{(.*)}}}/g;
            // ret = ret.replace(p,"$1");
            items = ret.match(p);
            if (items && items.length > 0) {
                // console.log(items);
                $.each(items, function(key, value) {
                    value2 = value.replace(p, "$1");
                    if (languagePack[value2]) {
                        ret = ret.replace(value, languagePack[value2][language]);
                    }
                })
            }

            // 在视图区插入模板
            obj.html(ret);
            if (callback) {
                callback();
            }
        }
    })
}
// appStorelink
var appStoreLink = "https://itunes.apple.com/cn/app/nei-rong-jia-qi-ye-wang-pan/id1014382616?l=en&amp;mt=8";


/************************************ 封装 start*****************************************/
// 工具
var Util = {
    showLoading: function() {
        // $("#loadingmodal").remove();
        var str = "<div id='loadingmodal' class='loadingmodal'>" +
            "<img class='gifLoadingImg' src='../images/loading.gif'>" +
            "</div>";
        $("body").append(str);
    },
    hideLoading: function() {
        $("#loadingmodal").remove();
    },
    // 通用提示框
    showTipModal: function(text) {
        $("#tipmodal").remove();
        var str = "<div id='tipmodal' class='tipmodal'>" +
            "<div class='tipmodal_text'>" +
            text +
            "</div>" +
            "</div>";
        $("body").append(str);
        clearInterval(t);
        var t = setTimeout(function() {
            $("#tipmodal").fadeOut(function() {
                $("#tipmodal").remove();
            });
        }, 1500);
    },
    // 根据错误码获取错误信息
    getServerError: function(errorCode) {
        if (errorCodeTable[errorCode]) {
            return errorCodeTable[errorCode][0];
        } else {
            return null;
        }
    },
    // 页面访问不合法，跳到首页
    unAuthAccessPage: function() {
        Util.showTipModal("无权访问此页面！");
        clearInterval(t);
        var t = setTimeout(function() {
            pjax2("#cloudFb/index");
        }, 1500);
    },
    // 没有权限访问跳转
    noPower: function() {
        Util.showTipModal("没有权限执行操作！");
        clearInterval(t);
        var t = setTimeout(function() {
            pjax2("#cloudFb/index");
        }, 1500);
    },
    // 弹出一个上下左右居中的窗口
    openWindow: function(openUrl, iWidth, iHeight) {
        var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
        var myWindow = window.open(openUrl, "_blank", "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft);
    },
    // 获取随机数(数字加字母)
    generateMixed: function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    },
    // 在弹出窗口中提示错误信息
    windowTip: function(tip) {
        $('body').html('<div style="width:100%;height:100%;text-align:center;font-size:16px;padding:20px;">' +
            '<span class="helpMiddleSpan"></span>' +
            '<span style="vertical-align: 30px;display: inline-block;">' +
            tip +
            '</span>' +
            '</div>');
    },
    // 将“true” “false” 转为 true false
    stringToBoolean: function(string) {
        if (string === "true") {
            return true;
        }
        if (string === "false") {
            return false;
        }
        return string;
    },
    // 检测token
    checkToken: function(callback) {
        // 登录信息
        var token = getCookie("tokenid");
        var uuid = getCookie("userid");
        if (token == "" || uuid == "") {
            if (callback) {
                callback();
            }
        } else {
            action({
                url: "/user/checktoken",
                data: { "token": getCookie('tokenid'), "uuid": getCookie('userid') },
                success: function(ret) {
                    pjax2("#company/usermanage");
                },
                error: function() {
                    if (callback) {
                        callback();
                    }
                }
            })
        }
    },
    // 检测企业登录状态
    isEnterpriseLogined: function() {
        // 登录信息
        var token = getCookie("tokenid");
        var uuid = getCookie("userid");
        var belongCid = localStorage.getItem("belongCid");
        var isAdmin = Util.stringToBoolean(localStorage.getItem("isAdmin"));
        var isFabuAdmin = Util.stringToBoolean(localStorage.getItem("isFabuAdmin"));
        var isCaAdmin = Util.stringToBoolean(localStorage.getItem("isCaAdmin"));
        // 检测登录信息
        if (token == "" || uuid == "" || belongCid == null || isAdmin == null || isFabuAdmin == null || isCaAdmin == null) {
            return false;
        } else {
            return true;
        }
    }
}

// 封装ajax
function action(params) {

    params.defaultLoading = params.defaultLoading != undefined ? params.defaultLoading : true;
    params.dueExit = params.dueExit != undefined ? params.dueExit : true;

    if (params.defaultLoading) {
        // 交互效果开启
        Util.showLoading();
    }
    $.ajax({
        type: params.type ? params.type : 'post',
        async: params.async == false ? false : true,
        url: config.HOST + params.url,
        data: params.data,
        success: function(ret) {
            if (params.success) {
                params.success(ret);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            var errorInfo = { errorCode: '', errorCodeInfo: '', errorRet: {} };
            // 获取errorCode
            try {
                var errorJSON = $.parseJSON(xhr.responseText);
                errorInfo.errorCode = errorJSON.errorCode;
                errorInfo.errorRet = errorJSON;
            } catch (e) {
                errorInfo.errorCode = -1;
                errorInfo.errorRet = xhr.responseText;
            }
            if (errorInfo.errorCode == 401001 && params.dueExit) {
                Util.showTipModal(Util.getServerError(errorInfo.errorCode));
                setTimeout(function() {
                    pjax2("#index/enterpriseLogin");
                }, 1000);
            } else {
                // 获取errorCodeInfo
                var info = Util.getServerError(errorInfo.errorCode);
                if (info == null) { // 状态码表中还没有此状态码
                    info = errorJSON.errorInfo;
                }
                errorInfo.errorCodeInfo = info;
                // 展示错误信息
                if (params.error) { // 自定义
                    params.error(errorInfo);
                } else { // 通用提示窗
                    Util.showTipModal(errorInfo.errorCodeInfo);
                }
            }

        },
        complete: function() {
            // 交互效果关闭
            Util.hideLoading();
            if (params.complete) {
                params.complete();
            }
        }
    })
}

/**
 * 退出登录
 * @return {[type]} [description]
 */
function exitLogin() {
    // 清除登录信息
    setCookie("tokenid", "");
    setCookie("userid", "");
    setCookie("jumpurl", "");
    localStorage.clear();

    pjax2("#index/enterpriseLogin");

    action({
        type: "post",
        url: "/user/unsetsession",
        success: function(ret) {
            // location.reload();
        }
    });
}

/**
 * 加载上传插件
 * @author zhang.lulu
 */
function loadUploadPlugIn() {
    if (bdfileuploadcount == 0) {
        bdfileuploadcount++;
        $("body").append('<script src="js\/jqueryfileupload\/jquery.ui.widget.js" type="text\/javascript"><\/script>' +
            '<script src="js\/jqueryfileupload\/jquery.fileupload.js"><\/script>' +
            '<script src="js\/jqueryfileupload\/jquery.iframe-transport.js"><\/script>');
    }
}
/************************************ 封装 end *************************************/