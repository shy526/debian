/**
 * 主要做消息集成
 */
let message=(function () {
    let obj={
        /**
         *右下
         */
        bottomRight:"bottomRight",
        bottomLeft:"bottomLeft",
        /**
         * 下中
         */
        bottomCenter:'bottomCenter',
        /**
         * 左上
         */
        topLeft:"topLeft",
        /**
         * 右上
         */
        topRight:"topRight",

        /**
         * 上中
         */
        topCenter:"topCenter",
        /**
         * 中
         */
        center:"center",
        flag:false,
        /**
         * 初始化脚本信息
         */
        init:function () {
            insertJs.insertCss("../debian/plugins/iziToast/iziToast.min.css",function () {
                insertJs.insertJs("../debian/plugins/iziToast/iziToast.js",function () {
                    iziToast.settings({
                        timeout: 5000,
                        // position: 'center',
                        // imageWidth: 50,
                        pauseOnHover: true,
                        // resetOnHover: true,
                        close: true,
                        progressBar: true,
                        // layout: 1,
                        // balloon: true,
                        // target: '.target',
                        // icon: 'material-icons',
                        // iconText: 'face',
                        // animateInside: false,
                        // transitionIn: 'flipInX',
                        // transitionOut: 'flipOutX',
                    });
                    obj.flag=true;
                })
            })
        },
        info:function () {
            if (obj.flag){
                iziToast.info({
                    title: '消息',
                    message: message,
                    position: position||obj.center,
                    transitionIn: 'bounceInLeft',
                    // iconText: 'star',
                });
            } else {
                console.log("message init deay")
            }
        },
        success:function (message,position) {
            if (obj.flag){
                iziToast.success({
                    title: '成功',
                    message: message,
                    position: position||obj.center,
                    transitionIn: 'bounceInLeft',
                    // iconText: 'star',
                });
            } else {
                console.log("message init deay")
            }
        },
        warning:function (message,position) {
            if (obj.flag){
                iziToast.warning({
                    title: '警告',
                    message: message,
                    position: position||obj.center,
                    transitionIn: 'bounceInLeft',
                    // iconText: 'star',
                });
            } else {
                console.log("message init deay")
            }
        },
        error:function (message,position) {
            if (obj.flag){
                iziToast.error({
                    title: '错误',
                    message: message,
                    position: position||obj.center,
                    transitionIn: 'bounceInLeft',
                    // iconText: 'star',
                });
            } else {
                console.log("message init deay")
            }
        }

    }
    return obj;
})()

window.onload=function () {
    message.init();
    setTimeout(function () {
        message.error("这是一个提示测试");
    },2000)



}