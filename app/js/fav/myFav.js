var tokenid = getCookie("tokenid");
var userid = getCookie("userid");

//有数据
// var tokenid = 'd3a72afd-debd-456a-9e34-17a0b4bd8e29';
// var userid = '9dec8afc-c725-11e6-b1ad-000c296c5f2b';
//无数据
// var userid = 'fa5a51f2-c725-11e6-9096-000c296c5f2b';
// var tokenid = 'cf566ad5-f488-4995-a1f2-56c6e8b4b1d8';

var groupIdGlobal = 0;
var isMyGroupGlobal = 1; // 代表是我的收藏

action({
    type: "post",
    url: "favorite/getgrouplist",
    data: { "tokenid": tokenid, "userid": userid, "type": 1 },
    success: function(ret) {
        var retObj = eval("(" + ret + ")");
        if (!retObj['errorCode']) {
            $.each(retObj, function(key, value) {
                if (value['type'] == 1) {
                    groupIdGlobal = value['id'];
                    return false;
                }
            })
            if (groupIdGlobal != 0) {
                /* 获取收藏列表 */
                var begin = 0;
                var nub = 10;
                var tagSearch = "";
                var code = 1;
                getFavoriteListAjax(groupIdGlobal, begin, nub, tagSearch, code);
                /* 获取tag列表 */
                getGroupTagListAjax(groupIdGlobal);
            }
        }
    }
})



/**
 * 获取收藏列表
 * code:0是无标签，code:1是有标签
 */
function getFavoriteListAjax(groupId, begin, nub, tagSearch, code) {
    // $(".favList_area .loading").show().css('top', $(window).height() / 2 + $("#myFavPage").scrollTop());
    // 判断是首次加载还是加载更多
    var isLoadMore = (begin == 0) ? 0 : 1;
    // 获取group的创建者
    var guser = $(".left_menu li[groupId=" + groupId + "]").attr("creater");
    guser = guser ? guser : 0;
    if (code == 0) { //无标签的收藏
        var postUrl = "favoriteV3/getFavoriteList";
        var postData = { "token": tokenid, "uuid": userid, "group": groupId, "begin": begin, "nub": nub };
    } else {
        var postUrl = "favoriteV3/getFavoriteList";
        var postData = { "token": tokenid, "uuid": userid, "group": groupId, "begin": begin, "nub": nub, "tag": tagSearch };
    }
    action({
        type: "post",
        timeout: ajax_timeout_lang,
        url: postUrl,
        data: postData,
        success: function(ret) {
            // var json = $.parseJSON(ret);
            var json = ret;
            var str = "";
            var onerror = "javascript:this.src='../images/photo.png'";
            if (!json["errorCode"]) {
                var imgStr = "";
                var favUrl = "";
                var jinStr = "";
                var tagStr = "";
                var readStr = "";
                var isReadRecord = "";
                var favDescStr = "";
                var isEditOrDelStr = "";
                $.each(json, function(key, value) {
                        // 收藏图
                        imgStr = "";
                        if (value['image']) {
                            imgStr = '<div class="img_div"><img src="' + value['image'] + '"></div>';
                        }
                        // 阅读页url
                        if (value['isConv'] == 1) {
                            favUrl = "http://" + config.HOST + "#home/read?gid=" + groupId + "&webid=" + value['id'] + "&guser=" + guser + "&fuser=" + value['user'] + "&url=" + value['url'];
                        } else {
                            favUrl = value['url'];
                        }
                        // 获取书签列表
                        tagStr = "";
                        action({
                                type: "post",
                                async: false,
                                url: "favoritev2/getfavoritetag",
                                data: { "token": tokenid, "uuid": userid, "favorite": value['id'] },
                                success: function(ret) {
                                    var json = $.parseJSON(ret);
                                    if (json.length > 0) {
                                        $.each(json, function(key2, value2) {
                                            tagStr += '<li>' + value2['tagName'] + '</li>';
                                        })
                                    }
                                }
                            })
                            // 是否记录阅读数(只有团队收藏夹才记录阅读数)
                        isReadRecord = "";
                        if (isMyGroupGlobal != 1) {
                            isReadRecord = 'addReadRecord(' + value['id'] + ',' + groupId + ')';
                        }
                        // 获取jin句列表
                        jinStr = "";
                        if (value['markCount'] > 0) {
                            favDescStr = "";
                            action({
                                type: "post",
                                async: false,
                                url: "/favorite/getmarkformurl",
                                data: { "tokenid": tokenid, "userid": userid, "webid": value['id'], "groupid": groupId, "begin": 0, "nub": 2 },
                                success: function(ret) {
                                    var json1 = $.parseJSON(ret);
                                    var mark = "";
                                    $.each(json1, function(key1, value1) {
                                        mark = decodeURI(getSelContent(value1['markinfo'])).replace(/<(\S*?)[^>]*>/g, "").replace(/<br>/g, "").replace(/<\s?img[^>]*>/gi, '');
                                        jinStr += '<li markId="' + value1['id'] + '"><span>' + mark + '<em class="yh_r"></em></span></li>';
                                    })
                                }
                            })
                        } else {
                            if (value['desc'] != "") {
                                favDescStr = '<a href="' + favUrl + '" target="_blank" class="noajax" onclick="' + isReadRecord + '">' +
                                    '<div class="fav_desc">' + htmlEntityCharToChar(value['desc']) + '</div>' +
                                    '</a>';
                            } else {
                                favDescStr = "";
                            }
                        }
                        // 是否有阅读数
                        readStr = "";
                        if (value['count'] > 0) {
                            readStr = '<span class="fav_readNum" onclick="getReadRecordList(' + value['id'] + ',' + groupId + ')">阅读&nbsp;<em>' + value['count'] + '</em></span>';
                        }
                        // 当前登录者是否有编辑或删除权限
                        isEditOrDelStr = "";
                        if (isMyGroupGlobal == 1 || userid == value['user']) {
                            isEditOrDelStr = '<div class="edit_or_del_oper"><div><button class="edit" onclick="editFav(' + value['id'] + ')"></button><button class="del" onclick="delFav(' + value['id'] + ')"></button></div></div>';
                        } else if ($('.left_menu .current').attr('creater') == userid) {
                            isEditOrDelStr = '<div class="edit_or_del_oper"><div class="no_edit"><button class="del" onclick="delFav(' + value['id'] + ')"></button></div></div>';
                        }
                        // console.log(favUrl);
                        str += '<li class="fav" favId="' + value['id'] + '">' +
                            '<div class="content_div">' +
                            '<a href="' + favUrl + '" target="_blank" class="noajax" onclick="' + isReadRecord + '">' +
                            '<p class="fav_title">' + htmldecode(value['title']) + '</p>' +
                            '</a>' +
                            '<div class="fav_info">' +
                            '<div>' +
                            '<span class="fav_time">' + getTime(value['time'], "howLongAgo") + '</span>' +
                            readStr +
                            '<ul class="fav_tag_list">' +
                            tagStr +
                            '</ul>' +
                            "</div>" +
                            '</div>' +
                            favDescStr +
                            '<a href="' + favUrl + '" target="_blank" class="noajax" onclick="' + isReadRecord + '">' +
                            '<ul class="fav_jin_list">' +
                            jinStr +
                            '</ul>' +
                            '</a>' +
                            '</div>' +
                            '<a href="' + favUrl + '" target="_blank" class="noajax" onclick="' + isReadRecord + '">' +
                            imgStr +
                            '</a>' +
                            isEditOrDelStr +
                            '<div style="clear:both"></div>' +
                            '</li>';
                    })
                    // 首次加载
                if (isLoadMore == 0) {
                    $("#favList").html(str);
                    // 加载更多
                } else {
                    $("#favList").append(str);
                }
                // jin句内容超出两行"..."的问题
                $(".fav_jin_list li").not(".fav_jin_list_loaded_li").each(function(index, el) {
                    $(this).addClass('fav_jin_list_loaded_li');
                    var obj = $(this).find("span");
                    if (obj.get(0).scrollHeight > obj.height()) {
                        $(this).addClass('right_ddd_li');
                        if (checkTheBrowser() != "googleChrome") {
                            obj.addClass('right_ddd_span');
                        }
                    }
                });
            } else {
                console.log(json);
                if (json['errorMessage'] == "get list failure") {
                    // 首次加载为空说明没有收藏
                    if (isLoadMore == 0) {
                        str = '<div style="width:320px;position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-250px;height:30px;line-height:30px;text-align:center;font-size:25px;">' + getLanguageByKey("string_group_no_list") + '<div></div></div>'
                        $("#favList").html(str);
                        // 加载更多为空说明加载完毕
                    } else {
                        str = '<div class="noFavList" style="width:100%;height:40px;text-align:center;">' + getLanguageByKey("string_group_no_more_list") + '<div>';
                        $("#favList").append(str);
                    }
                }
            }
            isLoadMoreFavList = true;
            $(".loading").hide();
        },
        error: function(xhr, textStatus, errorThrown) {
            // 加载更多为空说明加载完毕
            if (xhr['errorCode'] == "403078") {
                if (isLoadMore == 0) {
                    str = '<div style="width:320px;position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-170px;height:30px;line-height:30px;text-align:center;font-size:25px;color:#888888;">' + getLanguageByKey("string_group_no_list") + '<div></div></div>'
                    $("#favList").html(str);
                    // 加载更多为空说明加载完毕
                } else {
                    str = '<div class="noFavList" style="width:100%;height:40px;text-align:center;">' + getLanguageByKey("string_group_no_more_list") + '<div>';
                    $("#favList").append(str);
                }
            } else {
                var str = '<div style="width:320px;position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-170px;height:30px;line-height:30px;text-align:center;font-size:25px;color:#888888;"></div>'
                $("#favList").html(str);
                var boxDom = $("#favList").find("div");
                ajax_error(xhr, textStatus, errorThrown, boxDom);
            }
        },
        complete: function() {
            $(".favList_area .loading").hide();
        }
    })
}
/**
 * 获取收藏夹的书签列表
 */
function getGroupTagListAjax(groupIdGlobal, callback) {
    action({
        type: "post",
        url: "favoritev2/getgrouptag",
        data: { "token": tokenid, "uuid": userid, "group": groupIdGlobal },
        success: function(ret) {
            var json = $.parseJSON(ret);
            var str = "";
            if (json.length > 0) {
                $.each(json, function(key, value) {
                        str += '<button class="tag" favNum="' + value['count'] + '" tagName="' + value['tagName'] + '">' + value['tagName'] + '</button>';
                    })
                    // 获取无标签的数量
                action({
                    type: "post",
                    url: "favoritev2/getallandnotag",
                    data: { "token": tokenid, "uuid": userid, "group": groupIdGlobal },
                    success: function(ret) {
                        var json2 = $.parseJSON(ret);
                        if (json2['notag'] > 0) {
                            str = '<button class="no_tag tag" favNum="' + json2['notag'] + '">无标签</button>' + str;
                        }
                        $("#tagList").html(str);
                        tagPB();
                        if (callback) {
                            callback();
                        }
                    }
                })
            } else {
                $("#tagList").html(str);
                if (callback) {
                    callback();
                }
            }
        }
    })
}

function tagPB() {
    $(".show_all_tag,.hide_all_tag").remove();
    // 书签隐藏的问题
    if ($(".tag_list").parent().hasClass('favList_area')) {
        // 书签只显示一排
        $(".tag_list").css({ "max-height": "37px", "overflow": "hidden" });
        if ($(".tag_list")[0].scrollHeight > 37) {
            $(".tag_list button").each(function() {
                // console.log($(this).position().top);
                if ($(this).position().top > 0) {
                    $(this).before('<button class="show_all_tag" onclick="showAllTag()">......</button>');
                    $(".tag_list").append('<button class="hide_all_tag" onclick="hideAllTag()">收起</button>');
                    if ($(".show_all_tag").position().top > 0) {
                        $(".show_all_tag").prev("button").before($(".show_all_tag"));
                    }
                    return false;
                }
            })
        }
    } else {
        // 书签只显示三排
        $(".tag_list").css({ "max-height": "111px", "overflow": "hidden" });
        if ($(".tag_list")[0].scrollHeight > 111) {
            $(".tag_list button").each(function() {
                // console.log($(this).position().top);
                if ($(this).position().top > 74) {
                    $(this).before('<button class="show_all_tag" onclick="showAllTag()">......</button>');
                    $(".tag_list").append('<button class="hide_all_tag" onclick="hideAllTag()">收起</button>');
                    if ($(".show_all_tag").position().top > 74) {
                        $(".show_all_tag").prev("button").before($(".show_all_tag"));
                    }
                    return false;
                }
            })
        }
    }
}
/*******************************************滚动加载***************************************************/
/**
 * 滚动加载列表
 */
var isLoadMoreFavList = true;
$("#myFavPage").scroll(function() {
        if ($(".noFavList").size() == 0) {
            var scrollTop = $("#myFavPage").scrollTop();
            if ((scrollTop + $(window).height()) >= ($("#myFavPage").get(0).scrollHeight - 20)) {
                if (isLoadMoreFavList) {
                    isLoadMoreFavList = false;
                    var begin = $("#favList .fav").size();
                    var nub = 5;
                    var tagSearch = "";
                    var code = 1;
                    if ($("#tagList .current").size() > 0) {
                        tagSearch = $("#tagList .current").html();
                        if ($("#tagList .current").hasClass('no_tag')) {
                            code = 0;
                        }
                    }
                    // console.log(groupIdGlobal+"||"+begin+"||"+nub+"||"+tagSearch+"||"+code);
                    getFavoriteListAjax(groupIdGlobal, begin, nub, tagSearch, code);
                }
            }
        }
    })
    /*******************************************书签操作*************************************************/
    /**
     * 根据书签获取收藏列表
     */
$(document).off("click", "#tagList .tag");
$(document).on("click", "#tagList .tag", function() {
        // 选中书签名
        var tagSearch = $(this).html();
        var tagFavNum = $(this).attr("favNum");
        // 选中书签
        $("#tagList button").removeClass('current');
        $(this).addClass('current');
        // 显示查询条件div
        $(".see_condition .tag_name").html(tagSearch);
        $(".see_condition .tag_fav_num").html(tagFavNum);
        $(".see_condition").slideDown(100);
        // 获取通过tag查询的列表
        var begin = 0;
        var nub = 10;
        var code = 1;
        if ($(this).hasClass('no_tag')) {
            code = 0;
        }
        getFavoriteListAjax(groupIdGlobal, begin, nub, tagSearch, code);
    })
    /**
     * 清除书签条件查询
     */
function clearTagSearch() {
    // 隐藏查询条件div
    $(".see_condition").slideUp(100);
    // 清楚书签选中
    $("#tagList button").removeClass('current');
    // 获取所有收藏列表
    var begin = 0;
    var nub = 10;
    var tagSearch = "";
    var code = 1;
    getFavoriteListAjax(groupIdGlobal, begin, nub, tagSearch, code);
}
/**
 * 展开书签
 */
function showAllTag() {
    $(".tag_list").css({ "max-height": "", "overflow": "" });
    $(".show_all_tag").hide();
}
/**
 * 收起书签
 */
function hideAllTag() {
    if ($(".tag_list").parent().hasClass('favList_area')) {
        $(".tag_list").css({ "max-height": "37px", "overflow": "hidden" });
    } else {
        $(".tag_list").css({ "max-height": "111px", "overflow": "hidden" });
    }
    $(".show_all_tag").show();
}
/*******************************************屏幕自适应*************************************************/
$(window).resize(function(event) {
    windowAuto();
    tagPB();
});
windowAuto();

function windowAuto() {
    var window_w = $(window).width();
    // 如果是团队收藏夹
    if (isMyGroupGlobal == 0) {
        if (window_w < 1200) {
            // 列表区域的right值
            $(".favList_area").css({ "margin-right": "0px" });
            // 收起右侧
            $(".tagList_and_userList_area").css({ "right": "-240px" }).hide();
            // 显示展开按钮
            $(".show_or_hide").hide();
            $(".zhankai").show();
            // 将书签区域移动到列表区域
            $(".favList_area").prepend($("#tagList"));
        } else {
            // 列表区域的right值
            $(".favList_area").css({ "margin-right": "240px" });
            // 展开右侧
            $(".tagList_and_userList_area").css({ "right": "0" });
            // 展开收起按钮均隐藏
            $(".show_or_hide").hide();
            // 将书签移动到右侧区域
            $(".tagList_and_userList_area").show().prepend($("#tagList"));
        }
        // 如果是我的收藏
    } else if (isMyGroupGlobal == 1) {
        if (window_w < 1200) {
            // 列表区域的right值
            $(".favList_area").css({ "margin-right": "0px" });
            // 隐藏右侧区域
            $(".tagList_and_userList_area").hide();
            // 隐藏显示展开按钮
            $(".show_or_hide").hide();
            // 将书签区域移动到列表区域
            $(".favList_area").prepend($("#tagList"));
        } else {
            // 列表区域的right值
            $(".favList_area").css({ "margin-right": "240px" });
            // 展开右侧
            $(".tagList_and_userList_area").show();
            // 展开收起按钮均隐藏
            $(".show_or_hide").hide();
            // 将书签移动到右侧区域
            $(".tagList_and_userList_area").show().prepend($("#tagList"));
        }
    }
}
/**
 * 收起右侧
 */
function hideTagUserArea() {
    // 收藏列表区变化
    $(".favList_area").css({ "margin-right": "0px" });
    // 右侧区变化
    $("#index_right").css("overflow-x", "hidden");
    $(".show_or_hide").hide();
    $(".tagList_and_userList_area").animate({ "right": "-240px" }, function() {
        $("#index_right").css("overflow-x", "");
        $(".tagList_and_userList_area").hide();
        $(".zhankai").show();
    });
}
/**
 * 展开右侧
 */
function showTagUserArea() {
    // 收藏列表区变化
    $(".favList_area").css({ "margin-right": "0px" });
    // 右侧区变化
    $("#index_right").css("overflow-x", "hidden");
    $(".show_or_hide").hide();
    $(".tagList_and_userList_area").show().animate({ "right": "0" }, function() {
        $("#index_right").css("overflow-x", "");
        $(".shouqi").show();
    });
}
/*****************************编辑收藏**********************************/
/**
 * 鼠标移动到收藏列表上出现删除和编辑按钮
 */
$(document).off("mouseover", ".favList_area .fav");
$(document).off("mouseout", ".favList_area .fav");
$(document).on("mouseover", ".favList_area .fav", function() {
        $(this).find(".edit_or_del_oper").show();
    }).on("mouseout", ".favList_area .fav", function() {
        $(this).find(".edit_or_del_oper").hide();
    })
    /**
     * 点击编辑按钮
     */
function editFav(fid) {
    // 获取fav所属标签
    getFavoriteTag(fid);
    // 添加时间	
    $(".edit_box .btn_left").attr("onclick", "addGroupToWeb(" + fid + ")");
    // 清楚错误提示
    $(".edit_box_error").html("");
    // 显示编辑框
    $('.edit_mask').fadeIn();
}
/**
 * 是否选中推荐到广场
 */
$(".recommend_square i").click(function() {
        if ($(this).hasClass('select')) {
            $(this).removeClass('select');
        } else {
            $(this).addClass('select');
        }
    })
    /**
     * 收藏编辑框点击取消或X
     */
$('.edit_box_top img,.btn_right').click(function(event) {
    $('.edit_mask').fadeOut();
});
$(document).off("click", ".edit_box_main .unshare i");
$(document).on("click", ".edit_box_main .unshare i", function() {
    $(this).toggleClass('select');
    if ($('.unshare .select').size() == $('.unshare li').size()) {
        $('.edit_box_main p i').addClass('select');
    } else {
        $('.edit_box_main p i').removeClass('select');
    }
});
$('.edit_box_main p i').click(function(event) {
    if ($(this).hasClass("select")) {
        $(this).removeClass('select');
        $('.unshare i').removeClass('select');
    } else {
        $(this).addClass('select');
        $('.unshare i').addClass('select');
    }
});

/**
 * zhang.lulu
 * 编辑分享到更多团队收藏夹
 */
var isAddGroupToWeb = true;

function addGroupToWeb(fid) {
    if (!isAddGroupToWeb) {
        return false;
    }
    if ($.trim($(".tag_div_error").text()) != "") {
        return false;
    }
    isAddGroupToWeb = false;
    $(".edit_box_error").html("");
    // 选中的共享团队
    var group = "";
    var gname;
    var size = $(".edit_box .unshare i[class='select']").size();
    if ($(".edit_box .unshare i[class='select']").size() > 0) {
        $(".edit_box .unshare i[class='select']").each(function(index, obj) {
            if (index == 0) {
                gname = $(obj).parent("li").text();
                group = $(obj).parent("li").attr("gid")
            } else {
                group += "," + $(obj).parent("li").attr("gid")
            }
        })
    }
    // 选中的标签
    var tag = "";
    if ($(".tag_div").size() > 0) {
        $(".tag_div").each(function(index) {
            if (index == 0) {
                tag = $(this).text();
            } else {
                tag += "," + $(this).text();
            }
        })
    }
    // 如果选了分享到其他团队或者标签选择有变化
    if (group != "" || (tag != $(".selected_tag_old").html())) {
        action({
            type: "post",
            url: "/favorite/addgrouptoweb",
            data: { "token": tokenid, "uuid": userid, "webid": fid, "group": group, "tag": tag },
            success: function(ret) {
                var json = $.parseJSON(ret);
                if (json['success']) {
                    var branch = $(".branch[fid=" + fid + "]");
                    if (size > 0 && $(".left_bottom .current").hasClass('myGroup')) {
                        if (branch.find(".read_num").size() == 0) {
                            branch.find(".branch_desc").after('<div class="read_num"><img src="images/share_icon.png">' + gname + '&nbsp;&nbsp;等<span>' + size + '</span>个团队</div>');
                        } else {
                            if (branch.find(".read_num").find("span").size() == 0) {
                                branch.find(".read_num").append('&nbsp;&nbsp;等<span>' + (size + 1) + '</span>个团队');
                            } else {
                                branch.find(".read_num").find("span").html(parseInt(branch.find(".read_num").find("span").html()) + size);
                            }
                        }
                    }
                    // 动态更细标签分类
                    if (tag != $(".selected_tag_old").html()) {
                        // 更新右侧标签
                        getGroupTagListAjax(groupIdGlobal);
                        // 更新收藏列表的标签
                        var str = "";
                        if (tag != "") {
                            $.each(tag.split(","), function(index, el) {
                                str += '<li>' + el + '</li>';
                            });
                        }
                        $(".fav_list .fav[favId='" + fid + "'] .fav_tag_list").html(str);
                    }
                    $('.edit_mask').fadeOut(function() {
                        isAddGroupToWeb = true;
                    });
                } else {
                    alert("编辑共享团队失败");
                    isAddGroupToWeb = true;
                }
            }
        })
    } else {
        // 什么都不改就直接隐藏掉吧
        $('.edit_mask').fadeOut(function() {
            isAddGroupToWeb = true;
        });
    }
}
/*****************************删除收藏**************************************/
/**
 * 点击删除收藏按钮
 */
function delFav(favId) {
    $('.del_mask').attr("favId", favId);
    $('.del_mask').fadeIn();
}
/**
 * 确定删除收藏
 */
function okDelFav() {
    var favId = $('.del_mask').attr("favId");
    delFavoriteAjax(favId, groupIdGlobal);
}
/**
 * 取消删除收藏
 */
function cancelDelFav() {
    $('.del_mask').fadeOut();
}
/**
 * 删除收藏列表
 */
var isDeleteFav = true;

function delFavoriteAjax(favId, groupId) {
    if (!isDeleteFav) {
        return false;
    }
    isDeleteFav = false;
    action({
        type: "post",
        url: "/favorite/deletefavorite",
        data: { "tokenid": tokenid, "userid": userid, "favorite": favId, "group": groupId },
        success: function(ret) {
            var json = $.parseJSON(ret);
            if (json['id'] > 0) {
                // 更新标签栏
                var favObj = $(".fav_list .fav[favId=" + favId + "]");
                updateTagInfo(favObj);
                // 隐藏确定删除弹出框
                $(".del_mask").fadeOut();
                // 删除此条收藏
                $(".fav_list .fav[favId=" + favId + "]").slideUp("slow", function() {
                    $(this).remove();
                    isDeleteFav = true;
                })
            } else {
                isDeleteFav = true;
            }
        }
    })
}

function updateTagInfo(favObj) {
    // 删除的收藏没有所属标签
    if (favObj.find(".fav_tag_list").html() == "") {
        $("#tagList .no_tag").attr("favNum", parseInt($("#tagList .no_tag").attr("favNum")) - 1);
        // 如果有"无标签"查询条件
        if ($(".see_condition").is(":visible") && $(".see_condition .tag_name").html() == "无标签") {
            $(".see_condition .tag_fav_num").html(parseInt($(".see_condition .tag_fav_num").html()) - 1);
        }
        // 删除的收藏有所属标签
    } else {
        // 如果有"无标签"查询条件,记录当前的查询条件，刷新标签列表后再选中
        if ($(".see_condition").is(":visible")) {
            currentSelectTag = $(".see_condition .tag_name").html();
        } else {
            currentSelectTag = "";
        }
        getGroupTagListAjax(groupIdGlobal, currentSelectTag);
    }
}