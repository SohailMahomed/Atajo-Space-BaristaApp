var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var es = require('event-stream');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');

var libDependencies = require('./libDependencies.json');


/**
 * Inject custom CSS and JS in index
 */
gulp.task('bowerlibs', function() {
    var bowerSources = gulp.src(mainBowerFiles(), { base: './bower_components' });
    //console.log(JSON.stringify(bowerSources,null,2))
    return bowerSources
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./packages/1.0/js/1libs'));
});

/**
 * Generate minified CSS from scss
 */
gulp.task('sass', function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(cleanCss({
            keepSpecialComments: 0,
            compatibility: 'ie7',
            debug: true
        }, function(details) {
            console.log(details.name + ' original : ' + details.stats.originalSize);
            console.log(details.name + '      min : ' + details.stats.minifiedSize);
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./packages/1.0/css/'))
        .on('end', done);
});
