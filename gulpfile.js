const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
 
// transpiles JS into /dist
gulp.task('build', () =>
    gulp.src('src/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);

// compiles SASS into CSS
gulp.task('sass', () => {
    return gulp.src('./styles/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
});

// watches for changes in sass files to compile on save
gulp.task('watch', function() {
    gulp.watch('./styles/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.js', gulp.series('build'));
});