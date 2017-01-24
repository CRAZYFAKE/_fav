/**
 * zhang.lulu
 * 标签功能
 */
$(".edit_tag_input").keydown(function(event) {
    var text = $.trim($(this).val());
    if (text.length > 15) {
        $(".tag_div_error").html("单个标签最多输入15个字");
        return;
    }
    if (event.keyCode == 8) { //回格删除键
        if ($(this).val() == "") {
            var obj = $(this).prev(".tag_div");
            checkIsCyTag(obj);
            obj.remove();
        }
    }
    if ($(".tag_div").size() == 10 || $(".tag_div").size() > 10) {
        $(".tag_div_error").html("最多输入10个标签");
        $(".edit_tag_input").val("");
        return;
    }
    $(".tag_div_error").html("");
    if (event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188) { //按空格、换行或逗号均将可为文字添加标签效果
        if ($.trim($(this).val()) != "") {
            addTagDiv();
        }
    }
});
$(".edit_tag_input").keyup(function(event) {
        // 中文逗号添加标签效果
        if ($(this).val().indexOf("，") != -1) {
            $(this).val($(this).val().replace("，", ""));
            addTagDiv();
        }
        // 空格事件会在input中留下一个空格
        if (event.keyCode == 32) {
            $(this).val($(this).val().replace(" ", ""));
        }
        // 逗号事件会在input中留下一个逗号
        if (event.keyCode == 188) {
            $(this).val($(this).val().replace(",", ""));
        }
    })
    /*标签输入框失焦*/
$(".edit_tag_input").blur(function() {
        console.log("失焦");
        // $(".tag_div_error").html("");
        var text = $.trim($(".edit_tag_div input").val());
        if (text != "") {
            if ($(".edit_tag_div .tag_div").size() > 10) {
                $(".edit_tag_div input").val("");
            } else {
                if (text.length >= 15) {
                    $(".tag_div_error").html("单个标签最多输入15个字");
                } else {
                    // 将输入框中的文字自动转化为标签
                    addTagDiv();
                }
            }
        } else {
            $(".tag_div_error").html("");
        }
    })
    /*点击标签区域均展示光标*/
$(".edit_tag_div").click(function() {
        $(this).find("input").focus();
    })
    /*添加标签效果*/
function addTagDiv() {
    if ($(".tag_div").size() == 10) {
        $(".tag_div_error").html("最多输入10个标签");
        $(".edit_tag_input").val("");
        $(".tag_div_error").html("");
    } else if (!checkTagRepeat($.trim($(".edit_tag_input").val()))) { //防止输入重复标签
        $(".edit_tag_input").val("");
    } else {
        // 判断输入的标签是否和常用的相同
        var i = 0;
        $(".usual_use_con span").each(function() {
            if ($(this).attr("title") == $.trim($(".edit_tag_input").val())) {
                i = 1;
                $(".edit_tag_input").before('<div class="cytag tag_div" cytagid="' + $(this).index() + '">' + $.trim($(".edit_tag_input").val()) + '<span class="del_tag_div"></span></div>');
                $(this).hide();
                return false;
            }
        })
        if (i == 0) {
            $(".edit_tag_input").before('<div class="tag_div">' + $.trim($(".edit_tag_input").val()) + '<span class="del_tag_div"></span></div>');
        }
        $(".edit_tag_input").val("");
    }
}
/*删除标签效果*/
$(document).on("click", ".del_tag_div", function() {
        var obj = $(this).parent(".tag_div");
        checkIsCyTag(obj);
    })
    /*判断删除标签对象是否是常用标签,如果是就放回到常用*/
function checkIsCyTag(obj) {
    if (obj.hasClass('cytag')) { //说明是常用标签
        var cytagid = obj.attr("cytagid");
        $(".usual_use_con span").eq(cytagid).show();
    }
    obj.remove();
    $(".edit_tag_input").focus();
    if ($.trim($(".edit_tag_input").val()) != "") {
        // 自动将其转化为标签效果
        addTagDiv();
    }
}
/*添加常用标签到标签*/
$(document).off("click", ".usual_use_con span");
$(document).on("click", ".usual_use_con span", function() {
        // 检查是否已经超过10个标签
        if ($(".tag_div").size() > 10 || $(".tag_div").size() == 10) {
            $(".tag_div_error").html("最多输入10个标签");
            return false;
        }
        // 防止输入重复标签
        if (checkTagRepeat($.trim($(".edit_tag_input").val()))) {
            $(".edit_tag_input").before('<div class="cytag tag_div" cytagid="' + $(this).index() + '">' + $(this).attr("title") + '<span class="del_tag_div"></span></div>');
            $(this).hide();
        }
    })
    /*判断新输入标签和已输入标签是否有重复*/
function checkTagRepeat(tagName) {
    var i = true;
    $(".tag_div").each(function() {
        if (tagName == $(this).text()) {
            i = false;
            return false;
        }
    })
    return i;
}
/**
 * 获取常用标签(zhang.lulu)
 * code=0代表拿到5个常用标签
 * code=1代表拿到所有返回的常用标签
 */
function getUserTag(code, token, uuid) {
    if (code == 0) {
        tokenid = token;
        userid = uuid;
    }
    action({
        type: "post",
        url: "favoritev2/getusertag",
        data: { "token": tokenid, "uuid": userid },
        success: function(ret) {
            var json = $.parseJSON(ret);
            if (json.length > 0) {
                var str = "";
                $.each(json, function(key, value) {
                    if (code != 1) {
                        if (key == 5) { return false; }
                        str += '<span title="' + value['tagName'] + '">' + getShort(value['tagName'], 6, "...") + '</span>';
                    } else {
                        // 如果是编辑中已存在的常用标签需要踢掉
                        var hideStr = '';
                        if ($(".edit_tag_div .tag_div").size() > 0) {
                            $(".tag_div").each(function() {
                                if (value['tagName'] == $(this).text()) {
                                    hideStr = 'style="display:none"';
                                    $(this).addClass('cytag').attr('cytagid', key);
                                    return false;
                                }
                            })
                        }
                        str += '<span title="' + value['tagName'] + '" ' + hideStr + '>' + getShort(value['tagName'], 6, "...") + '</span>';
                    }
                })
                $(".usual_use_con").html(str);
                if (code == 1) {
                    $(".edit_box").css({ "top": "50%", "margin-top": -$(".edit_box").height() / 2 })
                }
            }
        }
    })
}
/*获取favorite所属标签*/
function getFavoriteTag(fid) {
    action({
        type: "post",
        url: "favoritev2/getfavoritetag",
        data: { "uuid": userid, "token": tokenid, "favorite": fid },
        success: function(ret) {
            var json = $.parseJSON(ret);
            if (!json["errorCode"]) {
                var str = "";
                var tagStr = "";
                $.each(json, function(key, value) {
                    str += "<div class='tag_div'>" +
                        value['tagName'] +
                        "<span class='del_tag_div'></span>" +
                        "</div>";
                    if (key == 0) {
                        tagStr = value['tagName'];
                    } else {
                        tagStr += "," + value['tagName'];
                    }
                })
                $(".selected_tag_old").html(tagStr);
            }
            $(".edit_tag_div .tag_div").remove();
            $('.edit_tag_input').before(str);
        },
        complete: function() {
            // 获取常用标签
            getUserTag(1);
        }
    })
}