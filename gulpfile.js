let gulp = require('gulp');
    mkdirs = require('mkdirp'),
    fileInclude = require('gulp-file-include'),
    minifycss=require('gulp-minify-css'),   //css压缩
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
    babel=require('gulp-babel'),   //es6转es5
    del=require('del'),   //es6转es5
    notify=require('gulp-notify'),
        zip = require('gulp-zip');;   //提示
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
        .pipe(fileInclude({
            prefix: '@@',//变量前缀 @@include
            basepath: './src/html/common/',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest('./dist/debian'));//输出文件路径
});

gulp.task('mov',  function() {
    return gulp.src('./node_modules/github-markdown-css/github-markdown.css')
        .pipe(gulp.dest('./src/css'))
});


//css处理
gulp.task('css',function(){
    return gulp.src(['./src/css/*.css','./src/css/*/*.css'])      //设置css
        .pipe(gulp.dest('dist/css'))           //设置输出路径
        .pipe(minifycss())                    //压缩文件
        .pipe(gulp.dest('dist/css'))            //输出文件目录
});
//JS处理
gulp.task('js',function(){
    return gulp.src(['./src/js/**/*.js','!./src/js/template/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/js'))            //输出
});
gulp.task('font',  function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
});
gulp.task('img',  function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'))
});
gulp.task('t1',  function() {
    return gulp.src('./src/js/template/**/*')
        .pipe(gulp.dest('./dist/js/template'))
});
gulp.task('t2',  function() {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('./dist/'))
});


gulp.task('deleteDist', function (cb) {
     del([
        'dist/**/*',
    ], cb);
});
gulp.task('build', gulp.series(['mov','js','css','font','img','t1','t2','fileInclude'],()=>{

}));

gulp.task("zip",()=>{

    gulp.src('./dist/**')
        .pipe(zip('all.zip'))                   // 压缩成all.zip文件
        .pipe(gulp.dest('./dist'))
})

