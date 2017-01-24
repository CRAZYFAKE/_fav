/**
 * zhang.lulu
 * readPublic 关闭web顶部
 */
function closeHeader(){
    $(".read_public_header").slideUp();
}
/**
 * zhang.lulu
 * readPublic 关闭app底部
 */
function closeAppFooter(){
    $(".app_footer").slideUp();
}
/**
 * zhang.lulu
 * 屏幕适应 app底部
 */
function appFooterAuto(){
    var wordW = 170+10;
    if($(window).width()<(172+wordW)){
        $(".app_footer img").eq(1).hide();
    }else{
        $(".app_footer img").eq(1).show();
    }
    if($(window).width()<(122+wordW)){
        $(".app_footer .word").hide();
    }else{
        $(".app_footer .word").show();
    }
}
$(function(){
    appFooterAuto();
})
$(window).resize(function(){
    appFooterAuto();
})
/**
 * 点击查看标注列表
 */
$(document).on("click", "nrjmark", function (e) {
    var markId = $(this).attr("markId");
    $(".tag_list").attr("markId",markId);
    var begin = 0;
    var nub = 10;
    if(isApp==0){
        if (checkZD() == "pc") {
            $(".show_tag").css({"top":e.pageY+10});
            $(".mark_layer").show();
            $(".show_tag").show();
            getMarkList(begin,nub,1,0);
        }else{
            $(".app_show_tag").show();
            getMarkList(begin,nub,0,0);
        }
    }else{
        var markInfo = getMarkInfo(markId);
        if(checkZD()=="android"){
            HostApp.alertSquareMarkInfoDialog(markId,markInfo);
        }else{
            location.href = "IOS:::showMark:::" + markId +":::"+markInfo;
        }
    }
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
/**
 * 获取标注列表
 * code:1代表web端；0代表移动端
 * type:0代表首次加载；1代表加载更多
 */
function getMarkList(begin,nub,code,type){
    var markId = $(".tag_list").attr("markId");
    if(type==0){
        $(".show_tag .tag_list ul").html("");
        $(".app_show_tag .tag_list ul").html("");
    }
    $.ajax({
        type: "post",
        url: "/favoritev2/getmarkcontendlistnew",
        data: { "tagID": markId,"begin":begin,"nub":nub},
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
                        var delMarkContent = "";
                        str+='<li class="isText" markTextId="'+value['id']+'">'
                                +'<div class="tag_list_main">'
                                    +'<img src="'+userFace+'" onerror="'+onerror+'" class="img-circle">'
                                    +'<div class="list_main_txt">'
                                        +'<div class="list_main_txt_t">'
                                            +userName+fromGroup
                                        +'</div>'
                                        +'<p class="show_tag_comment">'+(value['content'].indexOf("emoji")>0?value['content']:html_encode(value['content']))+'</p>'
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
                if(type==0){
                    $(".tag_list").scrollTop(0);
                    if(code==1){
                        $(".show_tag .tag_list ul").html(str);
                    }else{
                        $(".app_show_tag .tag_list ul").html(str);
                    }
                }else{
                    if(code==1){
                        $(".show_tag .tag_list ul").append(str);
                    }else{
                        $(".app_show_tag .tag_list ul").append(str);
                    }
                }
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
            var begin = $(".tag_list li").size();
            var nub = 10;
            if(checkZD()=="pc"){
                getMarkList(begin,nub,1,1);
            }else{
                getMarkList(begin,nub,0,1);
            }
        }
    }
})
/**
 * 点击其他地方取消弹窗
 */
$("*").click(function (e) {
    var target = $(e.target);
    if (target.closest(".show_tag").length == 0 && target.closest(".app_show_tag").length == 0) {
        $(".show_tag").hide();
        $(".app_show_tag").hide();
        $(".mark_layer").hide();
    }
})