/**
 * 动态插入
 */

let insertJs=(function () {
    let obj={
        debug:true,
        insertJs:function (jsPath,callback) {
            var temp = document.createElement('script');
            temp.setAttribute('type', 'text/javascript');
            temp.src = jsPath
            temp.onload = function() {
                if (obj.debug){
                    console.log("js load succeed:"+jsPath);
                }
                if (callback) callback();
            };
            document.head.appendChild(temp);
        },
        insertCss:function ( path,callback) {
            let link = document.createElement('link');
            link.type='text/css';
            link.rel = 'stylesheet';
            link.href =   path;

        link.onload = function() {
                if (obj.debug){
                    console.log("css load succeed:"+path);
                }
                if (callback) callback();
            };
            document.head.appendChild(link);
        }
    }
    return obj;
})()