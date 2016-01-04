var gulp = require('gulp');

var watch = require('gulp-watch');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

//var handlebars = require('gulp-handlebars');
//var sourcemap = require('gulp-sourcemap');

var handlebars = require('gulp-compile-handlebars');
/*var manifest = require('asset-builder')('./assets/manifest.json');*/
//var path = manifest.paths;
//var config = manifest.config || {};
/*var globs = manifest.globs;*/

var opt = {
    source: 'assets/',
    dist: 'dist/'
}

/*gulp.task('jade',function(){*/
	//gulp.src('app/*.jade')
		//.pipe(jade({pretty: true}))
		//.pipe(gulp.dest('html/'))
//});

gulp.task('html',function(){
	gulp.src('views/*.hbs')
    .pipe(handlebars())
    .pipe(rename({extname: ".html"}))
	.pipe(gulp.dest('dist/html/'))
});

gulp.task('css',function(){
    gulp.src(opt.source + 'stylesheets/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('css:min',function(){
    gulp.src(opt.source + 'stylesheets/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest(opt.dist + 'content/css/'));
})

gulp.task('js',function(){
	gulp.src(opt.source + 'javascripts/*.js')
	.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('js:min',function(){
    gulp.src(opt.source + 'javascripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(opt.dist + 'content/js/'))
});

gulp.task('plugins',function(){
    gulp.src(opt.source + 'plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('public/javascripts/'))
});

gulp.task('plugins:min',function(){
    gulp.src(opt.source + 'plugins/*.js')
    .pipe(uglify())
    .pipe(concat('plugins.min.js'))
    .pipe(gulp.dest(opt.dist + 'content/js/'))
})
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
	gulp.src(['public/images/*.*'])
	.pipe(gulp.dest('dist/content/images/'));
});

gulp.task('watch', function() {
  //gulp.watch('app/views/*.html', ['html']);
    gulp.watch(opt.source + 'stylesheets/**/*.*', ['css']);
    gulp.watch(opt.source + 'javascripts/**/*.*', ['js']);
    gulp.watch(opt.source + 'javascripts/plugins/*.*', ['plugins']);
    gulp.watch('public/images/', ['img']);
});


gulp.task('style',['less:min']);
gulp.task('copy',['imgcopy']);
gulp.task('default', ['css', 'js', 'plugins', 'watch']);
gulp.task('build',['css:min', 'js:min', 'img','html']);
