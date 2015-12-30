var gulp = require('gulp');

var connect = require('gulp-connect');
var watch = require('gulp-watch');
var less = require('gulp-less');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
//var coffee = require('gulp-coffee');
//var livereload = require('gulp-livereload');

gulp.task('webserver', function() {
  connect.server({
		root: 'dist'//host: 'ajia.dev'
  });
});


/*
gulp.task('livereload', function() {
  gulp.src(['html/*.html', 'html/css/*.css'])
		.pipe(watch(['html/*.html','html/css/*.css','html/js/*.js']))
    .pipe(connect.reload());
});

gulp.task('jade',function(){
	gulp.src('app/*.jade')
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('html/'))
});

*/


gulp.task('html',function(){
	gulp.src('app/views/*.html')
	.pipe(gulp.dest('dist/html/'));
});

gulp.task('less',function(){
  gulp.src('app/public/stylesheets/site.less')
    .pipe(less())
		// .pipe(concat('all.css'))
        .pipe(minifyCss())
		.pipe(gulp.dest('dist/content/css/'));
		// .pipe(gulp.dest('html/content/css'))
});

gulp.task('hackie',function(){
    gulp.src('app/public/stylesheets/hackie.less')
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/content/css/'));
});

gulp.task('js',function(){
	gulp.src('app/public/javascripts/*.js')
	.pipe(gulp.dest('dist/content/js'));
});

// gulp.task('fontcss',function(){
// 	gulp.src('app/font-awesome/css/*.css')
// 	.pipe(gulp.dest('html/content/font-awesome/css'))
// });

// gulp.task('fontfeild',function(){
// 	gulp.src('app/font-awesome/fonts/*.*')
// 	.pipe(gulp.dest('html/content/font-awesome/fonts'))
// });

gulp.task('dp',function(){
	gulp.src([
        'app/js/datapick/mobiscroll.core.js',
        'app/js/datapick/mobiscroll.frame.js',
        'app/js/datapick/mobiscroll.scroller.js',
        'app/js/datapick/mobiscroll.util.datetime.js',
        'app/js/datapick/mobiscroll.datetimebase.js',
        'app/js/datapick/mobiscroll.datetime.js'
    ])
	.pipe(uglify())
	.pipe(concat('datapick.min.js'))
	.pipe(gulp.dest('html/content/js/'));
});

gulp.task('assets',function(){
	gulp.src('app/public/javascripts/assets/*.js')
	.pipe(uglify())
	.pipe(concat('assets.min.js'))
	.pipe(gulp.dest('dist/content/js/'));
});

gulp.task('img',function(){
	gulp.src(['app/public/images/*.*'])
	.pipe(gulp.dest('dist/content/images/'));
});

gulp.task('imgcopy',function(){
	gulp.src(['dist/content/images/*.*'])
	.pipe(gulp.dest('app/public/images/'));
});

gulp.task('watch', function() {
  gulp.watch('app/views/*.html', ['html']);
  gulp.watch('app/public/stylesheets/site.less', ['less']);
  gulp.watch('app/public/stylesheets/site/*.less', ['less']);
  gulp.watch('app/public/stylesheets/site/hackie.less', ['hackie']);
  gulp.watch('app/less/roots/*.less', ['less']);
  gulp.watch('app/less/lsf/*.less', ['less']);
  gulp.watch('app/public/javascripts/*.js', ['js']);
  gulp.watch('app/images/', ['img']);
});


gulp.task('style',['less','css']);
gulp.task('copy',['imgcopy']);
gulp.task('default', ['html', 'less','hackie','js', 'dp','assets','img', 'webserver', 'watch']);
