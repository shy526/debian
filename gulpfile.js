let gulp = require('gulp');
let mkdirs = require('mkdirp');
let fileInclude = require('gulp-file-include');
gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});

gulp.task('init',()=>{

    let dirs = [
        './src/html/',
        './src/html/common',
        './src/js/',
        './src/js/common/',
        './src/js/template/',
        './src/js/page/',
        './src/css/',
        './src/css/common/',
        './src/css/template/',
        './src/css/page/',
        './src/less/',
        './src/images/',
        './src/images/template/',
        './src/font/',
        './src/font/template/'
    ];

    dirs.forEach(dir => {
        let sync = mkdirs.sync(dir);
        console.log(sync)
    })
})


gulp.task('fileInclude', function() {
    gulp.src(['./src/html/*.html'])//主文件
        .pipe(fileinclude({
            prefix: '@@',//变量前缀 @@include
            basepath: './src/html/common',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest('./dist'));//输出文件路径
});

gulp.task('mov',  function() {
    return gulp.src('./node_modules/github-markdown-css/github-markdown.css')
        .pipe(gulp.dest('./src/css'))
});