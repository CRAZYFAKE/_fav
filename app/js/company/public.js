/********************公共设置管理员弹窗 start*****************************/

var uuid = getCookie("userid");
var token = getCookie("tokenid");

// 获取一级组织
function getoneorg() {
    action({
        type: "post",
        url: "/company/getsupervisoryrootorg",
        data: { "uuid": uuid, "token": token },
        success: function(ret) {
            var json = $.parseJSON(ret);
            var str = "";
            if (json.length > 0) {
                $.each(json, function(key, value) {
                    str += '<li>' +
                        '<div class="tree-demo">' +
                        '<span class="tree-switch" onclick="treeswitch(\'' + value['id'] + '\',this)"></span>' +
                        '<span class="tree-name">' + value['name'] + '</span>' +
                        '</div>' +
                        '</li>';
                })
                $(".tree-div ul").html(str);
            }
        }
    })
}

function treeswitch(orgid, obj) {
    var liObj = $(obj).parents("li:first");
    if ($(obj).hasClass('tree-switch-close')) {
        $(obj).removeClass('tree-switch-close');
        liObj.children('ul').slideUp();
    } else {
        $(obj).addClass('tree-switch-close');
        if (liObj.children('ul').size() > 0) {
            liObj.children('ul').slideDown();
        } else {
            liObj.append('<ul class="user-list"></ul><ul class="org-list"></ul>');
            getnextorg(orgid, liObj);
            getorgpersonlist(orgid, liObj);
        }
    }
}

// 获取组织下的组织
function getnextorg(orgid, liObj) {
    action({
        type: "post",
        url: "/company/getbubdepartments",
        data: { "uuid": uuid, "token": token, "cid": orgid },
        success: function(ret) {
            var json = $.parseJSON(ret);
            var str = "";
            if (json.length > 0) {
                $.each(json, function(key, value) {
                    str += '<li>' +
                        '<div class="tree-demo">' +
                        '<span class="tree-switch" onclick="treeswitch(\'' + value['id'] + '\',this)"></span>' +
                        '<span class="tree-name">' + value['name'] + '</span>' +
                        '</div>' +
                        '</li>';
                })
                liObj.children('.org-list').html(str);
            }
        }
    })
}

// 获取组织下的人
function getorgpersonlist(orgid, liObj) {
    action({
        type: "post",
        url: "/company/getalluserlist",
        data: { "uuid": uuid, "token": token, "cid": orgid },
        success: function(ret) {
            var json = $.parseJSON(ret);
            var str = "";
            if (json.length > 0) {
                $.each(json, function(key, value) {
                    str += '<li>' +
                        '<div class="tree-demo">' +
                        '<span class="tree-person-icon"></span>' +
                        '<span class="tree-person-name" onclick="selectuser(\'' + value['id'] + '\',\'' + value['user']['displayName'] + '\')">' + value['user']['displayName'] + '</span>' +
                        '</div>' +
                        '</li>';
                })
                liObj.children('.user-list').html(str);
            }
        }
    })
}

// 搜索组织下的人
function searchusers() {
    var windowDom = $("#yfb-admin-set-window");
    var searchDom = windowDom.find(".search-input-div");
    var listDom = windowDom.find(".search-user-list");
    var key = $.trim(searchDom.find("input").val());
    if (key == "") {
        return false;
    }
    searchDom.find("button").hide();
    searchDom.find(".remove").show();
    windowDom.find(".search-user-list").show();
    listDom.find("ul").html('<div class="no-user">加载中...</div>');
    action({
        type: "post",
        url: "/company/getalluserlistbykey",
        data: { "uuid": uuid, "token": token, "key": key },
        success: function(ret) {
            var json = $.parseJSON(ret);
            var str = "";
            if (json.length > 0) {
                $.each(json, function(key, value) {
                    str += '<li onclick="selectuser(\'' + value['id'] + '\',\'' + value['displayName'] + '\')">' +
                        value['displayName'] +
                        '</li>';
                })
            } else {
                str = '<div class="no-user">没有搜索到相关数据</div>'
            }
            listDom.find("ul").html(str);
        },
        error: function(xhr, textStatus, errorThrown) {
            ajax_error(xhr, textStatus, errorThrown);
        }
    })
}

// 清空搜索
function emptysearchuserskeyword() {
    var windowDom = $("#yfb-admin-set-window");
    var searchDom = $("#yfb-admin-set-window").find(".search-input-div");
    searchDom.find("input").val("");
    searchDom.find("button").show();
    searchDom.find(".remove").hide();
    windowDom.find(".search-user-list").hide();
}

// 选人到右边
function selectuser(uuid, uname) {
    if ($(".selected-user-list span[uuid='" + uuid + "']").size() == 0) {
        var html = '<span class="selected-user" uuid="' + uuid + '">' +
            '<i>' + uname + '</i>' +
            '<em class="cha" onclick="removeuser(this)"></em>' +
            '</span>';
        $(".selected-user-list").append(html);
    }

    var windowDom = $("#yfb-admin-set-window");
    windowDom.find(".search-user-list").hide();
}

// 删掉选到右边的人
function removeuser(obj) {
    $(obj).parent(".selected-user").remove();
}

// 获取选中的人
function getselectedusers() {
    var arr = [];
    $(".selected-user-list").find(".selected-user").each(function() {
        arr.push($(this).attr("uuid"));
    })
    return arr.join(",");
}

// 点击
$("*").click(function(e) {
    var target = $(e.target);
    if (target.closest(".search-user-list").length == 0 && target.closest(".search-input-div").length == 0) {
        var windowDom = $("#yfb-admin-set-window");
        windowDom.find(".search-user-list").hide();
    }
})

// 云发布管理员设置公共弹窗
function openyfbadminwindow() {
    var windowDom = $("#yfb-admin-set-window");
    // 初始化已选
    windowDom.find(".search-input-div").find("input").val("");
    windowDom.find(".search-input-div").find("button").show();
    windowDom.find(".search-input-div").find("button.remove").hide();
    windowDom.find(".selected-user-list").html("");
    // 初始化组织数据
    getoneorg();
    // 打开
    openPublicStylePopwindow('yfb-admin-set-window');
}

/**
 * 以非弹窗式打开管理员设置
 * @param  {[type]} domObj [放置管理员设置区域的dom对象]
 */
function placeWindowInDom(domObj) {
    domObj.html($(".yfb-admin-set-window"));
    $(".yfb-admin-set-window").addClass('yfb_admin_set_panel').removeAttr('style');

    var windowDom = $("#yfb-admin-set-window");
    // 初始化已选
    windowDom.find(".search-input-div").find("input").val("");
    windowDom.find(".search-input-div").find("button").show();
    windowDom.find(".search-input-div").find("button.remove").hide();
    windowDom.find(".selected-user-list").html("");
    // 干掉头部和尾部
    windowDom.find(".title").remove();
    windowDom.find(".oper").remove();
    // 初始化组织数据
    getoneorg();
    // 显示
    $(".yfb-admin-set-window").show();
}

// 加载设置弹窗
function loadYfbAdminSetWindowInPage(parentDom, callback) {
    action({
        type: 'GET',
        url: 'app/company/public.html?version=' + version,
        success: function(ret) {
            parentDom.append(ret);
            if (callback) {
                callback();
            }
        }
    })
}
/********************公共设置管理员弹窗 end*********************/