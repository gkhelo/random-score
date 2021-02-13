var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function() {
    gulp.src('public/scripts/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public/js'));
});