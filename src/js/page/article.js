
let  author={
    hookId:-1,
    pageNumber: 1,
    pageSize: 5,
    markdownPageNumber: 1,
    markdownPageSize: 20,
    flag: true,
    ifEnd: function (array) {
        if (author.hookId==-1 && author.pageNumber == 1) {
            if (array.length>0){
                author.hookId=array[0].id
                author.category(author.hookId)
                $("#user-depot").text("(" + array[0].githubName + "/" + array[0].depot + ")")
                console.log("初始化选中作者")
                author.markdownList();
            }

        }
        author.pageNumber++;
        if (array.length <= 0) {
            author.pageNumber = 1;
        }
    },
    list:function () {
        common.request({
            url:"/api/hook/list",
            data:{
                pageNumber: author.pageNumber,
                pageSize: author.pageSize
            },
            callback:function (result) {
                author.ifEnd(result);
                if (result.length <= 0) {
                    common.info("没有更多作者了!!!")
                    author.pageNumber=1;
                    return;
                }
                $("#user-depot-list").empty();
                result.forEach((item) => {
                    let html = "<li onclick='author.cut(this)' data-id=\""+item.id+"\"><a href=\"javascript:void(0)\">" + item.githubName + "/" + item.depot + "</a></li>"
                    $("#user-depot-list").append(html);
                })
                $("#user-depot-list").append("<li><a href=\"javascript:author.list()\">换一批</a></li>");
            }
        })
    },
    category:function (hookId) {
        common.request({
            url:"/api/category/all/" + hookId,
            callback:function (result) {
                $("#category-list").empty();
                result.forEach((item) => {
                    let html = "<li onclick='author.categoryMarkdown(this)' data-id=\"" + item.id + "\"><a href=\"javascript:void(0)\">" + item.defaultName + "</a></li>"
                    $("#category-list").append(html);
                })
            }
        })
    },
    categoryMarkdown:function (el,categoryId) {
        if (!categoryId) {
            categoryId = $(el).attr("data-id");
        }
        common.request({
            url:"/api/markdown/search/category/" + categoryId,
            callback:function (result) {
                //使加载失效
                author.hookId=-1;
                author.renderMarkdownList(result,true)
            }
        })
    },
    renderMarkdownList:function (array,flag) {
        if (flag){
            $("#markdown-list").empty();
        }
        array.forEach((item) => {
            let html = "    <li class=\"animate fadeInUp\" data-wow-delay=\"0.4s\">\n" +
                "                                    <div class=\"row\">\n" +
                "                                        <div class=\"col-sm-5\">";

            let number = Math.floor(Math.random()*(1-0+1)+0);
            if (number==0){
                html+=   "<img class=\"img-responsive\"\n" +
                    "                                                                   src=\"https://i.loli.net/2018/12/28/5c26454d91220.gif\" alt=\"\"></div>\n";
            } else {
                html+=   "<img class=\"img-responsive\"\n" +
                    "                                                                   src=\"https://i.loli.net/2018/12/28/5c26454da7109.gif\" alt=\"\"></div>\n";
            }

            html+="                                        <div class=\"col-sm-7\">\n" +
                "                                            <a href=\"#.\" class=\"tittle-post font-playfair\">\n" +
                item.name +
                "                                            </a>\n" +
                "                                            <!--  Post Info -->\n" +
                "                                            <ul class=\"info\">\n" +
                "                                                <li><i class=\"fa fa-user\"></i>" + item.userName + "</li>\n" +
                "                                                <li><i class=\"fa fa-calendar-o\"></i> " + new Date(item.updateTime).Format("yyyy-MM-dd hh:mm") + "</li>\n" +
                "                                                <li style='cursor: pointer;' onclick='javascript:window.open(\"" + item.githubUrl + "\");'><i class=\"fa fa-link\"></i>原文</li>\n" +
                "                                            </ul>\n" +
                "                                            <a target='_blank' class=\"btn btn-small btn-dark\" href=\"" + item.showUrl + "\">查看</a>\n" +
                "                                            <div class=\"blog-tag-icon\">";
            //1笔记 2 图片 3音屏 4 视频 5 连接
            if (item.typed == 1) {
                html += "<i class=\"fa fa-pencil\"></i>";
            } else if (item.typed == 2) {
                html += " <i class=\"fa fa-picture-o\"></i>";
            } else if (item.typed == 3) {
                html += " <i class=\"fa fa-headphones\"></i>";
            } else if (item.typed == 4) {
                html += " <i class=\"fa fa-film\"></i>";
            } else if (item.typed == 5) {
                html += " <i class=\"fa fa-link\"></i>";
            }
            html += "</div>\n" +
                "                                        </div>\n" +
                "                                </li>\n";
            $("#markdown-list").append(html);
        })
    },
    cut:function (el){
        let id = $(el).attr("data-id");
        author.hookId=id
        author.markdownPageNumber=1;
        common.request({
            url:"/api/hook/one/"+id,
            callback:function (result) {
                $("#user-depot").text("(" + result.githubName + "/" + result.depot + ")")
                console.log("切换作者:"+result.githubName)
                author.category(result.id)
            }
        })
        author.markdownList();
    },
    init:function () {
        author.list()
    },
    markdownList:function () {
        if (author.hookId==-1){
            common.info("请选择作者!!!")
            return;
        }
        common.request({
            url: "/api/markdown/search/hook",
            data:{
                hookId: author.hookId,
                pageNumber: author.markdownPageNumber,
                pageSize: author.markdownPageSize
            },
            callback:function (result) {
                let flag=null;
                if (author.markdownPageNumber==1){
                    flag=true;
                }
                author.markdownPageNumber++;
                if (result.length<=0){
                    common.info("没有更多数据了")
                    return;
                }

                author.renderMarkdownList(result,flag);
            }
        })
    }
}



$(function () {
    author.init()
    //搜索栏
    function searchText() {
        let val = $("#search-text").val();
        if (!val) {
            common.info("搜索栏为空!!!")
            return;
        }

        common.request({
            url:"/api/markdown/search/name/like",
            data: {
                name: val
            },
            callback:function(result){
                //使下拉失效
                author.hookId=-1;
                author.renderMarkdownList(result,true);
            }
        })
    }
    $("#search").click(function () {
        searchText();
    });
    $("#search-text").keypress(function (e) {
        if (e.which == 13) {
            searchText();
        }
    });

    /*
    * 最近提交
    * */
    function top6() {
       common.request({
           url:"/api/markdown/top/6",
           callback:function (result) {
               $("#latest-post").empty()
               result.forEach((item) => {
                   let html = "<li>\n" +
                       "<div class=\"media\">\n" +
                       "<div class=\"media-left\"><a target='_blank' href=\"" + item.showUrl + "\"><img style='    width: 70px;\n" +
                       "    height: 70px;' \n" +
                       "                                                src=\"https://i.loli.net/2018/12/28/5c26454d91220.gif\" alt=\"\"></a></div>\n" +
                       "                                        <div class=\"media-body\"><a href=\"" + item.showUrl + "\">" + item.name + "</a>\n" +
                       "                                            <p>" + item.userName + "</p>\n" +
                       "                                        </div>\n" +
                       "                                    </div>\n" +
                       "                                </li>";
                   $("#latest-post").append(html);
               })
           }
       })
    }
    top6();
})