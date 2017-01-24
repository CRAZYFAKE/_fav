/**
 * 选中左侧菜单
 */
function selectLeft(hash) {
    var hash = hash ? hash : location.hash;
    $(".view-two-left li").removeClass('current');
    $(".view-two-left a[href='" + hash + "']").parent("li").addClass('current');
}

function subpageSelectLeft(page) {
    $(".view-two-left li").each(function() {
        if ($(this).find("a").html() == page) {
            $(this).addClass("current").siblings().removeClass("current");
        }
    })
}
/**
 * 点击选中当前菜单
 */
function selectCurrent(obj) {
    $(".view-two-left li").removeClass('current');
    $(obj).addClass('current');
}

/**
 * 封装分页js
 */
function loadPage(allNum, pageNum) {
    // 记录
    $("#pageDiv").attr({ "allNum": allNum, "pageNum": pageNum });
    // 总页数
    var totalPage = (allNum % pageNum) >= 1 ? parseInt(allNum / pageNum) + 1 : parseInt(allNum / pageNum);
    // 是否出现省略号
    var str = "";
    if (totalPage > 1) {
        if (totalPage > 10) {
            for (var i = 1; i <= totalPage; i++) {
                if (i == 1) {
                    str += '<span class="left_no_turn prevPage" onclick="prevPage(this)"><em></em></span>';
                    str += '<span class="page current firstPage show">' + i + '</span>';
                    str += '<span class="ellipsis firstEllipsis">...</span>';
                } else if (i == totalPage) {
                    str += '<span class="ellipsis lastEllipsis">...</span>';
                    str += '<span class="page lastPage">' + i + '</span>';
                    str += '<span class="no_margin nextPage" onclick="nextPage(this)"><em class="last_page"></em></span>';
                } else {
                    str += '<span class="page">' + i + '</span>';
                }
            }
        } else {
            for (var i = 1; i <= totalPage; i++) {
                if (i == 1) {
                    str += '<span class="left_no_turn prevPage" onclick="prevPage(this)"><em></em></span>';
                    str += '<span class="page current firstPage show">' + i + '</span>';
                } else if (i == totalPage) {
                    str += '<span class="page lastPage">' + i + '</span>';
                    str += '<span class="no_margin nextPage" onclick="nextPage(this)"><em class="last_page"></em></span>';
                } else {
                    str += '<span class="page show">' + i + '</span>';
                }
            }
        }
        $("#pageDiv").html(str);
        $("#pageDiv .page").removeClass('show');
        $("#pageDiv .page.firstPage").next(".ellipsis").hide();
        $("#pageDiv .page").each(function(index) {
            if ($(this).hasClass('firstPage') || (index > 0 && index < 8) || $(this).hasClass('lastPage')) {
                $(this).addClass('show');
            }
        })
    } else {
        $("#pageDiv").html("");
    }
    if (allNum > pageNum) {
        var currentPage = 1;
        var start = (currentPage - 1) * pageNum + 1;
        var end = currentPage * pageNum;
        $(".right_footer_l span").html(start + "~" + end);
        $(".right_footer_l em").html(allNum);
        var begin = (currentPage - 1) * pageNum;
        var nub = pageNum;
    } else {
        if (allNum <= 1) {
            $(".right_footer_l span").html(allNum);
        } else {
            $(".right_footer_l span").html(1 + "~" + allNum);
        }
        $(".right_footer_l em").html(allNum);
        var begin = 0;
        var nub = pageNum;
    }
    var arr = { "begin": begin, "nub": nub };
    return arr;
}
/**
 * 点击页码
 */
$(document).off("click", "#pageDiv .page");
$(document).on("click", "#pageDiv .page", function() {
        $("#pageDiv .page").removeClass('current');
        $(this).addClass('current');
        if ($("#pageDiv .page.current").hasClass("firstPage")) {
            $("#pageDiv .prevPage").addClass('left_no_turn');
        } else {
            $("#pageDiv .prevPage").removeClass('left_no_turn');
        }
        if ($("#pageDiv .page.current").hasClass("lastPage")) {
            $("#pageDiv .nextPage").addClass('right_no_turn');
        } else {
            $("#pageDiv .nextPage").removeClass('right_no_turn');
        }
        // 加载数据
        loadData();
    })
    /**
     * 点击上一页
     */
function prevPage(obj) {
    // 如果上一页按钮是可以点的
    if (!$(obj).hasClass('left_no_turn')) {
        // 选中上一页
        $("#pageDiv .page.current").removeClass("current").prevAll(".page").eq(0).addClass('current');
        // 下一页按钮打开
        $("#pageDiv .prevPage").removeClass('left_no_turn');
        // 如果选中页是第一页
        if ($("#pageDiv .page.current").hasClass("firstPage")) {
            $("#pageDiv .prevPage").addClass('left_no_turn');
        } else {
            $("#pageDiv .prevPage").removeClass('left_no_turn');
        }
        if ($("#pageDiv .page.current").hasClass("lastPage")) {
            $("#pageDiv .nextPage").addClass('right_no_turn');
        } else {
            $("#pageDiv .nextPage").removeClass('right_no_turn');
        }
        // 如果选中页是不可见的
        if (!$("#pageDiv .page.current").hasClass('show')) {
            // 展示结尾省略号
            $("#pageDiv .lastEllipsis").show();
            // 重新展示可见页码
            $("#pageDiv .page.show").removeClass('show');
            $("#pageDiv .page.current").addClass('show');
            var hPageSize = $("#pageDiv .page.current").prevAll(".page").size();
            console.log(hPageSize);
            if (hPageSize < 7) {
                // 隐藏开头省略号
                $("#pageDiv .firstEllipsis").hide();
                // 展示前面所有页码
                $("#pageDiv .page.current").prevAll(".page").addClass("show");
                // 将后面的页码补全
                for (var i = 0; i < 7 - hPageSize; i++) {
                    $("#pageDiv .show:last").next().addClass('show');
                }
            } else if (hPageSize == 7) {
                // 隐藏开头省略号
                $("#pageDiv .firstEllipsis").hide();
                // 展示前面所有页码
                $("#pageDiv .page.current").prevAll(".page").addClass("show");
            } else if (hPageSize > 7) {
                // 展示开头省略号
                $("#pageDiv .firstEllipsis").show();
                // 展示前面面5个页码
                $("#pageDiv .page.current").prevAll(".page").each(function(index) {
                    if (index <= 4) {
                        $(this).addClass('show');
                    } else {
                        return false;
                    }
                })
            }
        }
        // 第一页和最后一页始终可见
        $("#pageDiv .firstPage,#pageDiv .lastPage").addClass('show');
        // 加载数据
        loadData();
    }
}
/**
 * 点击下一页
 */
function nextPage(obj) {
    // 如果下一页按钮时可以点的
    if (!$(".nextPage").hasClass('right_no_turn')) {
        // 选中下一页
        $("#pageDiv .page.current").removeClass("current").nextAll(".page").eq(0).addClass('current');
        // 上一页按钮打开
        $("#pageDiv .prevPage").removeClass('left_no_turn');
        // 如果选中页是最后一页
        if ($("#pageDiv .page.current").hasClass("firstPage")) {
            $("#pageDiv .prevPage").addClass('left_no_turn');
        } else {
            $("#pageDiv .prevPage").removeClass('left_no_turn');
        }
        if ($("#pageDiv .page.current").hasClass("lastPage")) {
            $("#pageDiv .nextPage").addClass('right_no_turn');
        } else {
            $("#pageDiv .nextPage").removeClass('right_no_turn');
        }
        // 如果选中页是不可见的
        if (!$("#pageDiv .page.current").hasClass('show')) {
            // 展示开头省略号
            $("#pageDiv .firstEllipsis").show();
            // 重新展示可见页码
            $("#pageDiv .page.show").removeClass('show');
            $("#pageDiv .page.current").addClass('show');
            var hPageSize = $("#pageDiv .page.current").nextAll(".page").size();
            console.log(hPageSize);
            if (hPageSize < 7) {
                // 隐藏结尾省略号
                $("#pageDiv .lastEllipsis").hide();
                // 展示后面所有页码
                $("#pageDiv .page.current").nextAll(".page").addClass("show");
                // 将前面的页码补全
                for (var i = 0; i < 7 - hPageSize; i++) {
                    $("#pageDiv .firstEllipsis").nextAll(".show").eq(0).prev().addClass('show');
                }
            } else if (hPageSize == 7) {
                // 隐藏结尾省略号
                $("#pageDiv .lastEllipsis").hide();
                // 展示后面所有页码
                $("#pageDiv .page.current").nextAll(".page").addClass("show");
            } else if (hPageSize > 7) {
                // 展示结尾省略号
                $("#pageDiv .lastEllipsis").show();
                // 展示后面5个页码
                $("#pageDiv .page.current").nextAll(".page").each(function(index) {
                    if (index <= 4) {
                        $(this).addClass('show');
                    } else {
                        return false;
                    }
                })
            }
        }
        // 第一页和最后一页始终可见
        $("#pageDiv .firstPage,#pageDiv .lastPage").addClass('show');
        // 加载数据
        loadData();
    }
}

function loadData() {
    var allNum = parseInt($("#pageDiv").attr("allNum"));
    var pageNum = parseInt($("#pageDiv").attr("pageNum"));
    if (allNum > pageNum) {
        var currentPage = parseInt($("#pageDiv .page.current").html());
        var start = (currentPage - 1) * pageNum + 1;
        var end = currentPage * pageNum;
        $(".right_footer_l span").html(start + "~" + end);
        $(".right_footer_l em").html(allNum);
        var begin = (currentPage - 1) * pageNum;
        var nub = pageNum;
    } else {
        if (allNum <= 1) {
            $(".right_footer_l span").html(allNum);
        } else {
            $(".right_footer_l span").html(1 + "~" + allNum);
        }
        $(".right_footer_l em").html(allNum);
        var begin = 0;
        var nub = pageNum;
    }
    if (location.hash.indexOf("usermanage") != -1) {
        getUserList(begin, nub);
    } else {
        // 企业文档管理
        getDocLibListAjax(begin, nub);
    }
}


var uuid = getCookie("userid");
var token = getCookie("tokenid");

// 组织相关ajax
var companyAjax = {
    // 组织id（企业id或部门id）
    organizationId: "111",
    // 组织名称
    organizationName: "",
    // 组织树id
    treeOrganizationId: "",

    // 获取企业
    getsupervisoryrootorg: function(callback) {
        action({
            type: "post",
            url: "/company/getsupervisoryrootorg",
            data: { "uuid": uuid, "token": token },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 获取部门
    getbubdepartments: function(callback) {
        action({
            type: "post",
            url: "/company/getbubdepartments",
            data: { "uuid": uuid, "token": token, "cid": this.treeOrganizationId },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 新建部门
    adddepartment: function(callback) {
        action({
            type: "post",
            url: "/company/adddepartment",
            data: { "uuid": uuid, "token": token, "cid": this.organizationId, "name": this.organizationName },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 删除部门
    deletedepartment: function(callback) {
        action({
            type: "post",
            url: "/company/deletedepartment",
            data: { "uuid": uuid, "token": token, "cid": this.organizationId },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 编辑企业名称
    changecompanyname: function(callback) {
        action({
            type: "post",
            url: "/company/changecompanyname",
            data: { "uuid": uuid, "token": token, "cid": this.organizationId, "name": this.organizationName },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 编辑部门名称
    changedepartmentname: function(callback) {
        action({
            type: "post",
            url: "/company/changedepartmentname",
            data: { "uuid": uuid, "token": token, "cid": this.organizationId, "name": this.organizationName },
            success: function(ret) {
                callback(ret);
            }
        })
    }
}

// 组织成员相关ajax
var companyUserAjax = {

    // 用户登录账号
    userAccount: "",
    // 用户昵称
    userNickname: "",
    // 用户身份类型
    userIdentity: "",
    // 批量用户
    userIds: "",
    // 新部门
    newOrganizationId: "",

    // 获取部门下成员总数
    getusercount: function(callback) {
        action({
            type: "post",
            url: "/company/getusercount",
            data: { "uuid": uuid, "token": token, "cid": companyAjax.organizationId },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 获取部门成员列表
    getuserlist: function(callback) {
        action({
            type: "post",
            url: "/company/getuserlist",
            data: { "uuid": uuid, "token": token, "cid": companyAjax.organizationId, "begin": begin, "number": nub },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 根据成员登录名获取昵称
    getusernamebyaccount: function(callback) {
        action({
            type: "post",
            url: "/company/getusernamebyaccount",
            data: { "uuid": uuid, "token": token, "account": this.userAccount },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 部门添加成员
    addusertodepartment: function(callback) {
        action({
            type: "post",
            url: "/company/addusertodepartment",
            data: { "uuid": uuid, "token": token, "account": account, "cid": companyAjax.organizationId, "type": this.userIdentity, "displayName": this.userNickname },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 编辑成员身份
    changeuserpower: function(callback) {
        action({
            type: "post",
            url: "/company/changeuserpower",
            data: { "uuid": uuid, "token": token, "account": this.userAccount, "cid": companyAjax.organizationId, "type": this.userIdentity },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 删除部门成员
    removeuser: function(callback) {
        action({
            type: "post",
            url: "/company/removeuser",
            data: { "uuid": uuid, "token": token, "cid": companyAjax.organizationId, "removeIdList": this.userIds },
            success: function(ret) {
                callback(ret);
            }
        })
    },

    // 移动成员到其他部门（一个或多个）
    edituserdepartment: function(callback) {
        console.log("人:" + this.userIds);
        console.log("旧:" + companyAjax.organizationId);
        console.log("新：" + this.newOrganizationId);
        action({
            type: "post",
            url: "/user/edituserdepartment",
            data: { "uuid": uuid, "token": token, "userIds": this.userIds, "srcDepartId": companyAjax.organizationId, "destDepartId": this.newOrganizationId, "cid": localStorage.getItem("belongCid") },
            success: function(ret) {
                callback(ret);
            }
        })
    }
}

// 左侧栏切换功能
$('.view-two-left span.type').click(function(event) {
    $(this).children('em').toggleClass('rotate');
    $(this).siblings('ul').slideToggle(200);
});

/**
 * 获取最新管理员权限
 */
function updatePower() {
    action({
        url: '/sub/getuseryfbpower',
        data: { 'uuid': getCookie("userid"), 'token': getCookie("tokenid"), 'cid': localStorage.getItem("belongCid") },
        success: function(ret) {
            var isFabuAdmin_new = false;
            var isCaAdmin_new = false;
            if (ret['power'].indexOf("0") != -1) {
                isFabuAdmin_new = true;
            }
            if (ret['power'].indexOf("1") != -1) {
                isCaAdmin_new = true;
            }

            // 如果角色有变动，刷新页面
            if (isFabuAdmin_new != Util.stringToBoolean(localStorage.getItem("isFabuAdmin")) ||
                isCaAdmin_new != Util.stringToBoolean(localStorage.getItem("isCaAdmin"))) {
                localStorage.setItem("isFabuAdmin", isFabuAdmin_new);
                localStorage.setItem("isCaAdmin", isCaAdmin);
                // 更新左侧
                templateLoad($("#mainLeft"), "../app/company/left.html?version=" + version, function() {
                    selectLeft();
                });
            }
        }
    })
}