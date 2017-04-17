var gulp = require('gulp'),
  cssmin = require('gulp-clean-css');
  uglify = require('gulp-uglify');
  htmlmin = require('gulp-htmlmin');
gulp.task('testCssmin',function(){
	gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('minify-js',function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})
gulp.task('html',function(){
	var options = {
		collapseWhitespace:true,
		collapseBooleanAttributes:true,
		removeComments:true,
		removeEmptyAttributes:true,
		removeScriptTypeAttributes:true,
		removeStyleLinkTypeAttributes:true,
		minifyJS:true,
		minifyCSS:true
	};
	gulp.src('*.html')
	.pipe(htmlmin(options))
	.pipe(gulp.dest('dist/'));
})