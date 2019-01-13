
$(function () {
    let  str=null;
    $(".access").click(function () {
        if (!str) {
            common.request({
                url: "/api/hook/add",
                callback: function (result) {
                    str="你的访问码是:" + result + ",请妥善保存,该访问码会在二小时候失效,如何使用请查看帮助"
                    notie.force({
                        type: 'success',
                        text: str,
                    })
                }
            })
        }else {
            common.info(str)
        }

    })
})