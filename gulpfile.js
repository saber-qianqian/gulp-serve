var gulp = require('gulp')
var path = require('path')

var less = require('gulp-less')
var babel = require("gulp-babel")
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync')

var reload = browserSync.reload

function resolve(dir) {
	return path.join(__dirname, dir)
}

var MAPS = '../maps'
var DIST = 'app/dist'

gulp.task('less', function () {
	return gulp.src([ 'app/less/**/*.less', '!app/less/block/**/*.less' ])
		.pipe(sourcemaps.init())
		.pipe(less({ paths: [ resolve('app/less/block') ] }))
		.pipe(sourcemaps.write(MAPS))
		.pipe(gulp.dest(DIST + '/css'))
})


gulp.task("js", function () {
	return gulp.src("app/scripts/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: [ 'es2015', "stage-0" ] }))
		.pipe(sourcemaps.write(MAPS))
		.pipe(gulp.dest(DIST + "/js/"))
})

// 监视文件改动并重新载入
gulp.task('serve', [ 'less', 'js' ], function() {
	browserSync({
		server: { baseDir: 'app' }
	})

	gulp.watch('app/less/**/*.less', [ 'less' ])
	gulp.watch('app/scripts/**/*.js', [ 'js' ])
	gulp.watch([ '*.html', 'css/**/*.css', 'dist/**/*.js' ], { cwd: 'app' }, reload)
})
