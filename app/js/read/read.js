//xuelin start
var flag_word = true;
$('.read_column').children('div').eq(1).children('.word_title').click(function(event) {
    if (flag_word) {
        $(this).parent().stop().animate({ 'width': 372 }, 400);
        $('.word_range').fadeIn(1200);
        $(this).parent().addClass('spec');
        flag_word = false;
    } else {
        $(this).parent().stop().animate({ 'width': 64 }, 400);
        $('.word_range').hide();
        $(this).parent().removeClass('spec');
        flag_word = true;
    }
});
$('*').click(function(event) {
    var target = $(event.target);
    if (target.closest('.word_range').length == 0 && target.closest('.word_title').length == 0) {
        $('.read_column .word_change').removeClass('spec');
        $('.read_column div').eq(1).stop().animate({ 'width': 64 }, 400);
        $('.read_column div').eq(1).removeClass('current');
        $('.read_column div').eq(1).removeClass('night');
        $('.word_range').hide();
        flag_word = true;
    }
});
$('.word_range_con b').click(function(event) {
    $(this).addClass('current').siblings().removeClass('current');
});
$('.word_range_con b').eq(0).click(function(event) {
    $('.read_content').css({ 'font-size': 12, 'line-height': '22px' });
    $(".air_bubble_circle").addClass('fontSize_xiao');
    $(".air_bubble_circle").removeClass('fontSize_biaozhun');
    $(".air_bubble_circle").removeClass('fontSize_da');
    $(".air_bubble_circle").removeClass('fontSize_teda');
});
$('.word_range_con b').eq(1).click(function(event) {
    $('.read_content').css({ 'font-size': 16, 'line-height': '30px' });
    $(".air_bubble_circle").addClass('fontSize_biaozhun');
    $(".air_bubble_circle").removeClass('fontSize_xiao');
    $(".air_bubble_circle").removeClass('fontSize_da');
    $(".air_bubble_circle").removeClass('fontSize_teda');
});
$('.word_range_con b').eq(2).click(function(event) {
    $('.read_content').css({ 'font-size': 20, 'line-height': '38px' });
    $(".air_bubble_circle").addClass('fontSize_da');
    $(".air_bubble_circle").removeClass('fontSize_xiao');
    $(".air_bubble_circle").removeClass('fontSize_biaozhun');
    $(".air_bubble_circle").removeClass('fontSize_teda');
});
$('.word_range_con b').eq(3).click(function(event) {
    $('.read_content').css({ 'font-size': 24, 'line-height': '40px' });
    $(".air_bubble_circle").addClass('fontSize_teda');
    $(".air_bubble_circle").removeClass('fontSize_xiao');
    $(".air_bubble_circle").removeClass('fontSize_biaozhun');
    $(".air_bubble_circle").removeClass('fontSize_da');
});
var tag_light = true;
$('.read_column .day_night').click(function(event) {
    if (tag_light) {
        $('body,.read_body,.read_box,.read_header,.read_content,.air_bubble_circle,nrjmark,.nrj_share_a,.read_column,.return_top').addClass('night');
        $(this).parent().removeClass('current').addClass('night');
        if ($(".show_hide_mark").hasClass('current')) {
            $(".show_hide_mark").removeClass('current').addClass('night');
        }
        tag_light = false;
    } else {
        $('body,.read_body,.read_box,.read_header,.read_content,.air_bubble_circle,nrjmark,.nrj_share_a,.read_column,.return_top').removeClass('night');
        if ($(".show_hide_mark").hasClass('night')) {
            $(".show_hide_mark").removeClass('night').addClass('current');
        }
        $(this).siblings().removeClass('night');
        tag_light = true;
    }
});
$('.read_column .column').click(function(event) {
    if (tag_light) {
        $(this).removeClass('night').toggleClass('current');
    } else {
        $(this).removeClass('current').toggleClass('night');
    }
});
$('.read_column .day_night').click(function(event) {
    $(this).removeClass('current');
    $('.read_column .word_change,.read_column .share_box').removeClass('spec');
});
$('.read_column .jump_source_page').click(function(event) {
    $(this).removeClass('current');
    $(this).removeClass('night');
});
//分享
var flag_share = true;
$('.read_column div').eq(4).children('.share_title').click(function(event) {
    if (flag_share) {
        $(this).parent().stop().animate({ 'width': 372 }, 400);
        $(".share01").fadeIn(1200);
        $(this).parent().addClass('spec');
        flag_share = false;
    } else {
        $('.read_column div').eq(4).stop().animate({ 'width': 64 }, 400);
        $('.share01').hide();
        $(this).parent().removeClass('spec');
        flag_share = true;
    }
});
$('*').click(function(event) {
    var target = $(event.target);
    if (target.closest('.share_title').length == 0 && target.closest('.share01').length == 0) {
        $('.read_column .share_box').removeClass('spec');
        $('.read_column div').eq(4).stop().animate({ 'width': 64 }, 400);
        $('.read_column div').eq(4).removeClass('current');
        $('.read_column div').eq(4).removeClass('night');
        $('.share01').hide();
        flag_share = true;
    }
});
var scrollTop = 0;
$(window).scroll(function(event) {
    scrollTop = $(document).scrollTop();
    if (scrollTop >= 200) {
        $('.return_top').fadeIn();
    } else {
        $('.return_top').fadeOut();
    }
});
$('.return_top').click(function(event) {
    $(document).scrollTop(0);
});
//xuelin end
// 标注显示与隐藏
$(".show_hide_mark").click(function() {
        if ($(this).hasClass('show_mark')) {
            hideMark();
            $(this).addClass("hide_mark").removeClass("show_mark");
        } else {
            showMark();
            $(this).addClass("show_mark").removeClass("hide_mark");
        }
    })
    //lulu start
if (checkReadPublic() == "read") {
    s1.src = "js/read/addMark.js";
    $(".readPublic_tag_box").remove();
} else {
    s1.src = "js/read/readPublic.js";
    $(".read_tag_box").remove();
}
if (checkZD() == "pc") {
    $(".read_box").show();
    $(".webview_read_box").remove();
    $(".app_footer").remove();
} else {
    $(".read_body").remove();
    $(".webview_read_box").show();
}

// 定义变量
var params = getQueryParam();
var gid = params.gid;
var webid = params.webid;
var title = params.title;
var type = params.type;
var isConv = params.isConv;
var isApp = params.isApp ? params.isApp : 0; // 是否是webview调用

var url = params.url;
url = decodeURIComponent(url); //对ios端url十六进制解码
url = htmldecode(url); //ios转义字符转实体

var bdText = "";
var bdPic = "";
var bdUrl = "http://" + document.domain + "/#index/readPublic?gid=" + gid + "&webid=" + webid + "&title=1024&url=" + url;

// if(isConv==0){ //对移动端旧版本链接兼容处理
//     location.href = url;
//     $("body").html(""); //防止出现爱数内容家阅读画面
// }

// if(isConv==0){ //对移动端旧版本链接兼容处理
//     var bdUrl = url;
// }else{
//     var bdUrl = "http://"+document.domain+"/#index/readPublic?gid="+gid+"&webid="+webid+"&title=1024&url="+url;
// }

$(".jump_source_page a").attr("href", url);
if (type == 1) { //如果是广场阅读页
    $(".app_footer").remove();
}
if (checkReadPublic() == "read") {
    if (checkZD() == "pc") { //web端
        var tokenid = getCookie("tokenid");
        var userid = getCookie("userid");
    } else { //移动端嵌套
        var tokenid = params.tokenid;
        var userid = params.userid;
    }
} else {
    if (checkZD() == "pc") {
        $(".read_public_header").show();
        $(".read_header p").remove();
        if (type == 1) { //广场阅读页
            $(".read_public_header").remove();
        }
    } else {
        $(".app_footer").show();
    }
}

var getFavoriteInfoNub = 0; // 请求信息次数
var xTime = 1000; // 多久请求一次新数据
getFavoriteInfo();

/**
 * 获取收藏信息
 */
function getFavoriteInfo() {
    getFavoriteInfoNub++;
    if (getFavoriteInfoNub > 60) {
        $(".read_content").html("转换超时").show();
        hideMobileLoading1();
        hideMobileLoading2();
        return false;
    }
    if (checkReadPublic() == "read") {
        var postUrl = "/favoriteV3/getFavoriteInfo";
        var postData = { token: tokenid, uuid: userid, fid: webid };
    } else {
        var postUrl = "/favoriteV3/getPublicFavoriteInfo";
        var postData = { fid: webid };
    }
    action({
        type: "post",
        url: postUrl,
        data: postData,
        success: function(ret) {
            var json = ret[0];

            getFavoriteInfoSuccess(json); // 展示收藏信息

            if (json.isConv == 0) { // 转换中
                setTimeout(function() {
                    getFavoriteInfo();
                }, xTime);
            } else if (json.isConv == 2) { // 转换失败
                $(".read_content").html("转换失败").show();
                hideMobileLoading1();
                hideMobileLoading2();
            } else if (json.isConv == 1) { // 转换成功                
                if (json.ossURL) {
                    getContent(json.ossURL); // 获取内容
                    getMark(); // 获取标注         
                } else {
                    $(".read_content").html("网页内容存储地址丢失").show();
                    hideMobileLoading1();
                    hideMobileLoading2();
                }
            }
        },
        error: function(error) {
            $(".read_content").html(error.errorCodeInfo).show();
            hideMobileLoading1();
            hideMobileLoading2();
        }
    })
}

function getFavoriteInfoSuccess(json) {
    if (json['id']) {
        bdPic = json.image; // 分享链接附带图片
        title = json['title'];
        title = htmldecode(title);
        title = title.replace("<title>", "").replace("</title>", "").replace("<TITLE>", "").replace("</<TITLE>", "");
        bdText = title;
        document.title = title;
        $(".fav_title").html(title);
        // 收藏时间
        var time1 = getTime(json['time'], "howLongAgo");
        var time2 = getTime(json['time'], "ydmhm");
        $(".store_time span").html(time1);
        $(".store_time em").html(time2);
        $(".fav_time").html(time2);
        // 收藏来源
        if (json['source']) {
            $(".fav_from").html('<a style="color:#4D5A86;" href="' + url + '" target="_blank" class="noajax">' + json['source'] + '</a>');
        }
    }
}

var asyncLoadObj = { content: null, markList: null };

/**
 * 获取网页内容
 */
function getContent(ossUrl) {
    action({
        type: "post",
        url: "/proxy/post",
        data: { url: ossUrl },
        success: function(ret) {
            try {
                $(".read_content").html(ret).show();
            } catch (e) {
                console.log(e.message);
            }
            asyncLoadObj.content = 1;

            iosInitFont01();
            // $(".read_content").find('a').addClass('noajax');
            // $(".read_content").find('a').attr("target","_blank");

            if (checkZD() == "pc") {
                $(".share_bottom").show();
            }

            allLoadEnd();
        },
        error: function() {
            $(".read_content").html("加载失败");
        },
        complete: function() {
            hideMobileLoading1();
            hideMobileLoading2();
        }
    })
}

/**
 * 获取标注
 */
function getMark() {
    if (checkReadPublic() == "read") {
        var postUrl = "favorite/getmarkformurl";
        var postData = { "tokenid": tokenid, "userid": userid, "webid": webid, "groupid": gid, "isnew": 1 };
    } else {
        var postUrl = "favoritev2/getmarkformurl";
        var postData = { "webid": webid, "groupid": gid };
    }
    action({
        url: postUrl,
        data: postData,
        success: function(ret) {
            var retObj = eval("(" + ret + ")");
            if (retObj.length > 0) {
                asyncLoadObj.markList = retObj;
                allLoadEnd();
            }
        }
    });
}

/**
 * 内容和标注都获取完毕后，匹配标注
 */
function allLoadEnd() {
    if (asyncLoadObj.content != null && asyncLoadObj.markList != null) {
        searchKey(asyncLoadObj.markList);
        iosInitFont02();
    }
}

/**
 * 关闭移动端loading
 */
function hideMobileLoading1() {
    if (checkReadPublic() == "read" || isApp == 1) {
        if (checkZD() == "iphone") {
            try {
                var message = {
                    "func": "ConvSuccessful"
                }
                window.webkit.messageHandlers.webViewApp.postMessage(message);
            } catch (e) {
                location.href = "IOS:::ConvSuccessful";
            }
        } else if (checkZD() == "android") {
            if (isApp == 1) { //广场webview
                HostApp.fileCovertSuccessOrFalure("square");
            } else {
                HostApp.fileCovertSuccessOrFalure("reader");
            }
        }
    }
}

/**
 * 关闭移动端loading
 */
function hideMobileLoading2() {
    if (checkZD() == "iphone") {
        location.href = "IOS:::ConvSuccessful";
    } else if (checkZD() == "android") {
        HostApp.fileCovertSuccessOrFalure("reader");
    }
}

/**
 * zhang.lulu
 * 移动端点击页面将操作按钮收起来
 */
$(".read_content").click(function(e) {
        var target = $(e.target);
        if (target.closest("nrjmark").length == 0) {
            if (checkZD() == "android") {
                HostApp.setViewState();
            } else if (checkZD() == "iphone") {
                location.href = "IOS:::hideBar";
                var message = {
                    "func": "hideBar"
                }
                window.webkit.messageHandlers.webViewApp.postMessage(message);
            }
        }
    })
    /**
     * zhang.lulu
     * 判断是pc访问还是webview访问
     */
function checkFL() {
    var href = location.href;
    if (href.indexOf("tokenid") != -1 && href.indexOf("userid") != -1) {
        return "webview";
    } else {
        return "brower";
    }
}
/**
 * zhang.lulu
 * 补全文章中路径
 */
function replaceURL() {

    var imgDOM = $(".read_content").find("img");
    var aDOM = $(".read_content").find("a");
    var url = location.href;
    console.log(url);
    url = url.substring(url.indexOf("url=") + 4);
    console.log(url);
    var host = url.substring(url.indexOf("//") + 2);
    host = host.substring(0, host.indexOf("/"));
    host = url.substring(0, url.indexOf("//") + 2 + host.length);
    path = url.substring(0, url.lastIndexOf("/") + 1);
    /* for (x = 0; x < imgDOM.size() ; x++) {
         src = getrealurl(imgDOM.eq(x));
         if (src.indexOf("http") != 0) {
             if (src.indexOf("//") == 0) {
                 imgDOM.eq(x).attr("src", src);
             }else if (src.indexOf("./") == 0 || src.indexOf("../") == 0) {
                 imgDOM.eq(x).attr("src", path + src);
             } else if (src.indexOf("/") == 0) {
                 // alert(getrealurl(imgDOM.eq(x)));
                 imgDOM.eq(x).attr("src", host + src);
             }else{
                 imgDOM.eq(x).attr("src", path + src);
             }
         }else{
             imgDOM.eq(x).attr("src", src);
         }
        
     }*/
    //alert(host);
    for (y = 0; y < aDOM.size(); y++) {
        src = aDOM.eq(y).attr("href");
        if (src) {
            if (src.indexOf("http") == -1) {
                if (src.indexOf("/") == 0) {
                    aDOM.eq(y).attr("href", host + src);
                } else if (src.indexOf("./") == 0 || src.indexOf("../") == 0) {
                    aDOM.eq(y).attr("href", path + src);
                    //console.log(path + src);
                } else {
                    aDOM.eq(y).attr("href", path + "/" + src);
                    //console.log(src.indexOf("/"));

                }
            } else {
                aDOM.eq(y).attr("href", src);
            }
        }
    }
}

function getrealurl(DOM) {
    $realSrc = ["data-lazyload", "zoomfile", "real_src", "data-original", "data-src", "data-rawwidth", "src"];
    for (z = 0; z < $realSrc.length; z++) {
        if (DOM.attr($realSrc[z])) {
            return DOM.attr($realSrc[z]);
        }
    }
    return "";
}
/**
 * zhang.lulu
 * 寻找标注
 */
function searchKey(retObj) {
    searchText(retObj);
}
/* 
 * 动态设置百度分享URL的函数,具体参数
 * cmd为分享目标id,此id指的是插件中分析按钮的ID
 *，我们自己的文章ID要通过全局变量获取
 * config为当前设置，返回值为更新后的设置。
 */
function SetShareUrl(cmd, config) {
    config.bdComment = $.trim($(".read_content").text().substring(0, 100));
    config.bdPic = bdPic;
    return config;
}

/**
 * 点击分享按钮之后
 */
function onAfterClick() {
    action({
        url: "/favoriteV3/setPublic",
        data: { token: tokenid, uuid: userid, fid: webid },
        success: function(ret) {
            // alert("分享成功");
        }
    })
}

/**
 * zhang.lulu
 * 分享js
 */
bdText = htmldecode(bdText);
window._bd_share_config = {
    common: {
        onBeforeClick: SetShareUrl,
        onAfterClick: onAfterClick,
        bdText: bdText,
        bdDesc: '',
        bdUrl: bdUrl,
        bdComment: '',
        bdSign: 'off',
        bdSearchPic: 0,
        bdSnsKey: { 'tsina': '3250313152' }
    },
    share: [{
        "bdSize": 24
    }]
}
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
/**
 * zhang.lulu
 * 判断是read页还是readPublic页
 */
function checkReadPublic() {
    var href = location.href;
    var str = href.substring(0, href.indexOf("&url="));
    if (str.indexOf("#index/readPublic") != -1) {
        return "readPublic";
    } else {
        return "read";
    }
}

/**
 * zhang.lulu
 * 展示标注
 * android、ios、web通用
 */
function showMark() {
    $(".read_content").html($(".read_content").html().replace(/hidenrjmark/g, "nrjmark"));
    $(".air_bubble_circle").show();
    // 开启标注功能
    openMark = true;
}
/**
 * zhang.lulu
 * 隐藏标注
 * android、ios、web通用
 */
function hideMark() {
    $(".read_content").html($(".read_content").html().replace(/nrjmark/g, "hidenrjmark"));
    $(".air_bubble_circle").hide();
    // 关闭标注功能
    openMark = false;
}
/**
 * zhang.lulu
 * 移动端开灯
 */
function turnOnLight() {
    $('.read_content_div').css('background', '#2f2d2e');
    $(".read_content").css({ "color": "#999999", 'background': '#2f2d2e' });
    $(".read_content").find("a").css({ "color": "#FFFFFF" });
    $('.share_group').css('font-size', 14);
    $('.share_group em').css({ "color": "#aaaaaa", 'font-size': 12 });
    $('h1.fav_title').css('color', '#949594');
    $('nrjmark').addClass('night');
    $('.air_bubble_circle').addClass('night');
}
/**
 * zhang.lulu
 * 移动端关灯
 */
function turnOffLight() {
    $('.read_content_div').css('background', '#fff');
    $('.read_content').css('background', '#ffffff');
    $(".read_content").css({ "color": "#595757" });
    $(".read_content").find("a").css({ "color": "#595757" });
    $('.share_group').css('font-size', 14);
    $('.share_group em').css({ "color": "#aaaaaa", 'font-size': 12 });
    $('h1.fav_title').css('color', '#5c5741');
    $('nrjmark.night').removeClass('night');
    $('.air_bubble_circle').removeClass('night');
}
/**
 * zhanglulu
 * 移动端调整字体大小
 */
function changeFont(code) {
    if (code == 1) { //小
        $('.read_content').css({ 'font-size': 12, 'line-height': '22px' });
        $(".air_bubble_circle").css("top", "16px");
    }
    if (code == 2) { //标准
        $('.read_content').css({ 'font-size': 16, 'line-height': '30px' });
        $(".air_bubble_circle").css("top", "23px");
    }
    if (code == 3) { //大
        $('.read_content').css({ 'font-size': 20, 'line-height': '38px' });
        $(".air_bubble_circle").css("top", "29px");
    }
    if (code == 4) { //特大
        $('.read_content').css({ 'font-size': 24, 'line-height': '40px' });
        $(".air_bubble_circle").css("top", "33px");
    }
}
/**
 * zhang.lulu
 * ios个别手机字体初始化设置
 */
function iosInitFont01() {
    if (checkZD() == "iphone") {
        if ($(window).width() < 350) {
            $('.read_content').css({ 'font-size': 14, 'line-height': '25px' });
        }
    }
}

function iosInitFont02() {
    if (checkZD() == "iphone") {
        if ($(window).width() < 350) {
            $(".air_bubble_circle").css("top", "18px");
        }
    }
}