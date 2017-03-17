var gulp = require('gulp')
var path = require('path')

var less = require('gulp-less')
var babel = require("gulp-babel")
var filter = require('gulp-filter')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync')

var reload = browserSync.reload

function resolve(dir) {
	return path.join(__dirname, dir)
}

var MAPS = '../maps'
var DIST = 'app/dist'

// css重载之后，atom下的改动也会变动
gulp.task('less', function () {
	return gulp.src([ 'app/less/**/*.less', '!app/less/block/**/*.less' ])
		.pipe(sourcemaps.init())
		.pipe(less({ paths: [ resolve('app/less/block') ] }))
		.pipe(sourcemaps.write(MAPS))
		.pipe(gulp.dest(DIST + '/css'))
		.pipe(filter('**/*.css'))
		.pipe(reload({stream: true}))
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
	gulp.watch([ '*.html', 'dist/**/*.js' ], { cwd: 'app' }, reload)
})

gulp.task('default', ['serve'])
