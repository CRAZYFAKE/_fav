function searchText(obj) {
    this.tetileArray = new Array();
    this.hrefArray = new Array();
    this.dom = $(".read_content");
    that = this;
    var count;
    for (x = 0; x < obj.length; x++) {
        var html =encodeURI( that.dom.html());
        html= html.replace(/%0D/g,"").replace(/%0A/g,"");//干掉%0A换行符

        var markinfo = $.parseJSON(obj[x]['markinfo']);
        var replaceinfo = $.parseJSON(obj[x]['replace']);
        var markpos = obj[x]['markpos']?($.parseJSON(obj[x]['markpos'])):"";
        for (y = 0; y < markinfo.length; y++) {
            markinfo[y] = markinfo[y].replace(/%0A/g,""); //干掉%0A换行符
            index = html.indexOf((markinfo[y]));
            if(index==-1){
                console.log(x+":"+y+":"+index);
                if(markinfo[y].indexOf("%3Ca%20")!=-1){ //说明可能是a标签的原因
                    markinfo[y] = changeA(markinfo[y],html);                
                }
                index = html.indexOf((markinfo[y]));
            }
            if(markpos[y]>1){
                for(var i=1;i<markpos[y];i++){
                    index = html.indexOf(markinfo[y],(index+1));
                }
            }
            if (html.substring(index - 6, index - 1) == "href=" || html.substring(index - 7, index - 1) == "title=") {
                index = html.indexOf((markinfo[y]), html.indexOf((markinfo[y])) + (markinfo[y]).length);
                bengin = html.substring(0, index);
                end = html.substring((index + (markinfo[y]).length));
                html = bengin + (replaceinfo[y]) + end;
            } else {
                bengin = html.substring(0, index);
                end = html.substring((index + (markinfo[y]).length));
                html = bengin + (replaceinfo[y]) + end;
            }
        }
       
        html = html.replace(/markid_replace/g, obj[x]['id']);
        try{
            html = decodeURI(html);
            this.dom.html(html);
            // 加气泡那个鬼
            count = obj[x]['count'];
            count = count>99?"99+":count;
            if($.trim($("nrjmark[markId="+obj[x]['id']+"]:first").html())!=""){
                $("nrjmark[markId="+obj[x]['id']+"]:first").prepend('<span class="air_bubble_circle" markId="'+obj[x]['id']+'" nub="'+obj[x]['count']+'">'
                                                                        +'<span class="air_bubble_count">'+count+'</span>人标注'
                                                                    +'</span>');
            }else{
                $("nrjmark[markId="+obj[x]['id']+"]").each(function(){
                    if($.trim($(this).html())!=""){
                        $(this).prepend('<span class="air_bubble_circle" markId="'+obj[x]['id']+'" nub="'+obj[x]['count']+'">'
                                                                    +'<span class="air_bubble_count">'+count+'</span>人标注'
                                                                +'</span>');
                        return false;
                    }
                })
            }
        }catch(e){
            console.log(obj[x]['id']);
        }
    }
    // 加气泡那个鬼
    /*var count;
    for (x = 0; x < obj.length; x++) {
        count = obj[x]['count'];
        count = count>99?"99+":count;
        if($.trim($("nrjmark[markId="+obj[x]['id']+"]:first").html())!=""){
            $("nrjmark[markId="+obj[x]['id']+"]:first").prepend('<span class="air_bubble_circle" markId="'+obj[x]['id']+'" nub="'+obj[x]['count']+'">'
                                                                    +'<span class="air_bubble_count">'+count+'</span>人标注'
                                                                +'</span>');
        }else{
            $("nrjmark[markId="+obj[x]['id']+"]").each(function(){
                if($.trim($(this).html())!=""){
                    $(this).prepend('<span class="air_bubble_circle" markId="'+obj[x]['id']+'" nub="'+obj[x]['count']+'">'
                                                                +'<span class="air_bubble_count">'+count+'</span>人标注'
                                                            +'</span>');
                    return false;
                }
            })
        }
    }*/

}
function changeA(markStr,html){
    var aSize = parseInt(markStr.split("%3Ca%20").length)-1;
    /**
     * 火狐
     * target="_blank"始终在前面
     * 如果class="noajax"是跟在target="_blank"后面，如果class=其他就在后面
     */
    if(html.indexOf("%3Ca%20target")!=-1 && markStr.indexOf("%3Ca%20target")==-1){
        console.log("火狐a标签问题");
        var start = 0;
        for(var i=0;i<aSize;i++){
            if(markStr.indexOf("class=%22noajax%22",start)!=-1){ //如果class中只有noajax
                console.log("i："+i+"(只有noajax的情况)");
                var one = markStr.substring(0,markStr.indexOf("%3Ca%20",start))+"%3Ca%20target=%22_blank%22%20class=%22noajax%22%20";
                var two = markStr.substring(markStr.indexOf("href",start),markStr.indexOf("%20class=%22noajax%22",start));
                var three = "%3E"+markStr.substring(markStr.indexOf("target=%22_blank%22%3E",start)+("target=%22_blank%22%3E").length,markStr.length);
                markStr = one+two+three;
            }else{
                console.log("i："+i+"(不只ajax的情况)");
                var one = markStr.substring(0,markStr.indexOf("%3Ca%20",start))+"%3Ca%20target=%22_blank%22%20";
                var two = markStr.substring(markStr.indexOf("href",start),markStr.indexOf("%20target=%22_blank%22",start));
                var three = "%3E"+markStr.substring(markStr.indexOf("target=%22_blank%22%3E",start)+("target=%22_blank%22%3E").length,markStr.length);
                markStr = one+two+three;
            }
            start = markStr.indexOf(three);
        }
    }
    /**
     * 谷歌
     * target="_blank"始终在后面
     * 如果class="noajax"是跟在target="_blank"前面，如果class=其他就在后面
     */
    else{
        console.log("谷歌a标签问题");
        var start = 0;
        for(var i=0;i<aSize;i++){
            if(markStr.indexOf("class=%22noajax%22",start)!=-1){ //如果class中只有noajax
                start = markStr.indexOf("%3Ca",start);
                console.log("i："+i+"(只有noajax的情况)");
                var one = markStr.substring(0,markStr.indexOf("%3Ca%20",start))+"%3Ca%20";
                var two = markStr.substring(markStr.indexOf("href",start),markStr.indexOf("%3E",start))+"%20class=%22noajax%22%20target=%22_blank%22";
                var three = markStr.substring(markStr.indexOf("%3E",start),markStr.length);
                markStr = one+two+three;
            }else{
                console.log("i："+i+"(不只ajax的情况)");
                start = markStr.indexOf("%3Ca",start);
                var one = markStr.substring(0,markStr.indexOf("%3Ca%20",start))+"%3Ca%20";
                var two = markStr.substring(markStr.indexOf("href",start),markStr.indexOf("%3E",start))+"%20target=%22_blank%22";
                var three = markStr.substring(markStr.indexOf("%3E",start),markStr.length);
                markStr = one+two+three;
            }
            start = markStr.indexOf(three);
        }
    }
    return markStr;
}
