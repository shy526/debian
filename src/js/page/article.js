let author = {
    pageNumber: 1,
    pageSize: 5,
    end: false,
    ifEnd: function (array) {
        this.pageNumber++;
        if (array.length <= 0) {
            this.pageNumber = 1;
        }
    }
}

function authorList(callback) {
    $.ajax({
        url: "/api/hook/list",
        data: {
            pageNumber: author.pageNumber,
            pageSize: author.pageSize
        },
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    author.ifEnd(result.data);
                    if (result.data.length <= 0) {
                        alert("没有更多的数据了")
                        return;
                    }
                    $("#user-depot-list").empty();
                    result.data.forEach((item) => {
                        let html = "<li onclick='cutAuthor(this)' data-id=\""+item.id+"\"><a href=\"javascript:void(0)\">" + item.githubName + "/" + item.depot + "</a></li>"
                        $("#user-depot-list").append(html);
                    })
                    $("#user-depot-list").append("<li><a href=\"javascript:authorS()\">换一批</a></li>");
                    if (callback) {
                        callback(result.data);
                    }
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })
}

/**
 * 刷新分类
 * @param hookId
 */
function refreshCategory(hookId) {
    $.ajax({
        url: "/api/category/all/" + hookId,
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    $("#category-list").empty();
                    result.data.forEach((item) => {
                        let html = "<li onclick='categoryMarkdown(this)' data-id=\"" + item.id + "\"><a href=\"javascript:void(0)\">" + item.defaultName + "</a></li>"
                        $("#category-list").append(html);
                    })
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })
}

/*
* 获取莫个分类下的所有markdown
* */
function categoryMarkdown(el, categoryId) {
    if (!categoryId) {
        categoryId = $(el).attr("data-id");
    }
    $.ajax({
        url: "/api/markdown/search/category/" + categoryId,
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    renderMarkdownList(result.data)
                    now.flag=false;
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })
}
/*
*最后生成的markdown
* */
function lastPost() {
    $.ajax({
        url: "/api/markdown/top/6",
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    $("#latest-post").empty()
                    result.data.forEach((item) => {
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
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })
}

/*
* 渲染列表的markdown
* */
function renderMarkdownList(array,b) {
    if (!b){
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
}

/*
*
* 切换用户
* */
function cutAuthor(el){
    let id = $(el).attr("data-id");
    $.ajax({
        url: "/api/hook/one/"+id,
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    $("#user-depot").text("(" + result.data.githubName + "/" + result.data.depot + ")")
                    now.init(result.data);
                    refreshCategory( result.data.id)
                    console.log("切换用户")
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })

}

$(function () {
    authorList(function (data) {
        let item = data[0];
        if (item) {
            refreshCategory(item.id)
            now.init(item)
        }
    });
    lastPost();
    $("#search").click(function () {
        searchText();
    });


    $("#search-text").keypress(function (e) {
        if (e.which == 13) {
            searchText();
        }
    });



})

function searchText() {
    let val = $("#search-text").val();
    if (!val) {
        alert('不能为空');
        return;
    }
    $.ajax({
        url: "/api/markdown/search/name/like",
        data: {
            name: val
        },
        beforeSend: function () {

        },
        success: function (result) {
            if (result) {
                if (result.code == 200) {
                    renderMarkdownList(result.data);
                    now.flag=false;
                } else if (result.code == 500) {
                    alert(result.message)
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("没有对应code处理:" + result.code);
                }
            } else {
                console.log("没有任何返回值");
            }
        }
    })
}

let now={
    flag:true,
    authorId:-1,
    pageNumber:1,
    pageSize:5,
    next:function () {
        if (now.authorId==-1){
            alert("没有选择作者")
            return;
        }
        if (now.flag==false){
            alert("请重新选择作者")
            return ;
        }
        $.ajax({
            url: "/api/markdown/search/hook",
            data:{
                hookId: now.authorId,
                pageNumber: now.pageNumber,
                pageSize: now.pageSize
            },
            beforeSend: function () {

            },
            success: function (result) {
                if (result) {
                    if (result.code == 200) {
                        if (result.data.length<=0){
                            alert("没有更多的数据了")
                            return;
                        }
                        console.log("加载-------------")
                        let m=null
                        if (now.pageNumber==-1){
                            m=true;
                        }
                        renderMarkdownList(result.data,m);
                        now.pageNumber++;
                    } else if (result.code == 500) {
                        alert(result.message)
                    } else if (result.code == 302) {
                        document.location.href = result.data
                    } else {
                        console.log("没有对应code处理:" + result.code);
                    }
                } else {
                    console.log("没有任何返回值");
                }
            }
        })
    },
    init:function (item) {
        $("#user-depot").text("(" + item.githubName + "/" + item.depot + ")")
        console.log(JSON.stringify(item))
        now.flag=true;
        now.authorId=item.id;
        now.pageNumber=1;
        now.pageSize=5;
        now.next();
    }
}