/**
 * Created by liuwentao on 2015/6/2.
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifycss = require('gulp-minify-css');

//编译sass
gulp.task('sass', function() {
    return sass('source/sass', { style: 'expanded' })      //编译sass
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'android 4'))         //css兼容前缀
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});
//压缩js
gulp.task('js', function() {
    gulp.src('source/js/*.js')
        .pipe(uglify())         //压缩
        .pipe(gulp.dest('build/js'));
});
//编译ejs
gulp.task('ejs', function() {
    gulp.src('source/ejs/*.ejs')
        .pipe(ejs({
            msg: 'Hello Gulp!'
        }))
        .pipe(gulp.dest('build/'));
});
//监听页面，自动刷新静态服务器
gulp.task('html', function () {
    gulp.src('build/*.html')
        .pipe(connect.reload());  //刷新服务器
});

// 压缩图片
gulp.task('image', ['clean'], function() {
    return gulp.src(['source/images/*.{png,jpg,gif,ico}','source/images/*/*.{png,jpg,gif,ico}'])
        // Pass in options to the task
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],  //不要移除svg的viewbox属性
            use: [pngquant()]                       //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('build/images'));
});
// 监听
gulp.task('watch', function() {
    // 看守所有.scss档
    gulp.watch('source/sass/*.scss', ['sass']);
    // 看守所有.ejs档
    gulp.watch('source/ejs/*.ejs', ['ejs']);
    //判断页面改变，刷新页面
    gulp.watch(['build/*.html'], ['html']);
    // 看守所有图片档
    gulp.watch(['source/images/*','source/images/*/*'], ['image']);
    // 看守所有.js档
    gulp.watch(['source/js/*'], ['js']);
});
//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        port: 8000,
        livereload: true
    });
});
//清除文件
gulp.task('clean', function() {
    return gulp.src([ 'build/'], {read: false})
        .pipe(clean());
});
// 预设任务
gulp.task('default',['clean'], function() {
    gulp.start('sass', 'ejs','image','js', 'connect','watch');
});