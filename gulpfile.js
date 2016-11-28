var gulp = require('gulp'),
    jshint = require('gulp-jshint');
    concat = require('gulp-concat');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    paths = {
        root: './',
        dist:{
            root: 'dist/js/'
        }
    };

    framework = {
        filename: 'framework',
        jsFiles: [
            '../../src/js/framework.js',
        ]
    };


    // Concat & Minify JS
    gulp.task('minify', function(){
        return gulp.src(framework.jsFiles)
            .pipe(concat(framework.filename + '.js'))
            .pipe(gulp.dest(paths.dist.root))
            .pipe(rename(framework.filename + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(paths.dist.root));
    });

// Default
gulp.task('default', ['minify']);
