let index=(()=>{
    let top20= function (){
        $.ajax({
        url:"/api/markdown/top/20",
        beforeSend:function () {

        },
        success:function (result) {
            if (result){
                if (result.code==200){
                    result.data.forEach((item)=>{
                        let html="<li class=\"col-sm-3 item-mas animate fadeIn\" data-wow-delay=\"0.2s\">\n";


                        let number = Math.floor(Math.random()*(1-0+1)+0);
                        if (number==0){
                            html+=" <img class=\"img-responsive\" src=\"https://i.loli.net/2018/12/28/5c26454d91220.gif\" alt=\"\">\n";
                        } else {
                            html+=" <img class=\"img-responsive\" src=\"https://i.loli.net/2018/12/28/5c26454da7109.gif\" alt=\"\">\n";
                        }
                        html+=  " <div class=\"blog-tag-icon\">";
                        //1笔记 2 图片 3音屏 4 视频 5 连接
                        if(item.typed==1){
                            html+="<i class=\"fa fa-pencil\"></i>";
                        }else if (item.typed==2){
                            html+=" <i class=\"fa fa-picture-o\"></i>";
                        } else if (item.typed==3){
                            html+=" <i class=\"fa fa-headphones\"></i>";
                        } else if (item.typed==4){
                            html+=" <i class=\"fa fa-film\"></i>";
                        } else if (item.typed==5){
                            html+=" <i class=\"fa fa-link\"></i>";
                        }
                        html+="</div>\n" +

                            "<a  target='_blank' href=\""+item.showUrl+"\" class=\"tittle-post font-playfair\">"+item.name+"</a>\n" +
                            "<ul class=\"info\">\n" +
                            " <li><i class=\"fa fa-user\"></i> "+item.userName+"</li>\n" +
                            "<li><i class=\"fa fa-calendar-o\"></i>"+new Date(item.updateTime).Format("yyyy-MM-dd hh:mm")+"</li>\n" +
                            /*"<li><i class=\"fa fa-eye\"></i> 325</li>\n" +*/
                            "<li style='cursor: pointer;' onclick='javascript:window.open(\""+item.githubUrl+"\");'><i class=\"fa fa-link\"></i>原文</li>\n" +
                            " </ul>\n" +
                            " </li>";
                        $("#container").append(html);

                    })

                    var $container = $('#container');
                    $container.imagesLoaded(function () {
                        $container.isotope({
                            itemSelector: '.item-mas',
                            layoutMode: 'masonry'
                        });
                    });
                } else if (result.code==500){
                    alert(result.message)
                }else if (result.code==302) {
                    document.location.href=result.data
                }else {
                    console.log("没有对应code处理:"+result.code);
                }
            }else {
                console.log("没有任何返回值");
            }
        }
    })
    }
    top20();
})();
