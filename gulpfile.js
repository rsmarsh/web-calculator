const gulp = require('gulp');
const babel = require('gulp-babel');
 
// transpiles JS into /dist
gulp.task('build', () =>
    gulp.src('src/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);