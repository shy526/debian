let common=(function () {
    let cx={
        /**
         * 内部回调
         * @param result
         * @param succeed
         */
        ajaxCallback:function (result,succeed) {
            if (result) {
                if (result.code == 200) {
                   if (succeed){
                       succeed(result.data);
                   }else {
                       console.log(result)
                   }
                } else if (result.code == 500) {
                    notie.alert({ text:result.message,stay:true,type:"error" })
                } else if (result.code == 302) {
                    document.location.href = result.data
                } else {
                    console.log("code no dispose :" + result.code);
                }
            } else {
                console.log("ajax result is null");
            }
        },
        /**
         *
         * @param url url
         * @param type type
         * @param data 入参
         * @param callback  成功回调
         * @param timeout 超时
         */
        request:function ({
                url,
                type="GET",
                data={},
                callback,
                          }) {
            $.ajax({
                url: url,
                type: type,
                data: data,
                beforeSend: function () {

                },
                success: function (result) {
                    cx.ajaxCallback(result,callback)
                },
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    notie.alert({ text:"service error:"+XMLHttpRequest.status+","+XMLHttpRequest.statusText,stay:true,type:"error" })
                }
            })
        },
        info:function (message) {
            notie.alert({ text:message,type:"info" })
        }
    }
    return cx;
})();