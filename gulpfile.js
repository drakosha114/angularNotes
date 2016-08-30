/**
 * Created by drakosha on 30.08.2016.
 */
var gulp;
var bower;
var filter;
var mainBowerFiles;
var sass;
var browserSync;

gulp = require('gulp');
bower = require('bower');
filter = require('gulp-filter');
mainBowerFiles = require('main-bower-files');
sass = require('gulp-sass');
browserSync = require('browser-sync');

var _PATH_APP_;
var _PATH_DEST_;
var _PATH_ROOT_;
var _PATH_;
var _BOWER_DIR_;
var _PATH_BOWER_JSON_;

_PATH_APP_ = './app';
_PATH_DEST_ = './dest';
_PATH_ROOT_ = './';
_BOWER_DIR_ = './bower_components';
_PATH_BOWER_JSON_ = './bower.json';
_PATH_ = {
    app: {
        css: _PATH_APP_ + '/css/',
        js: _PATH_APP_ + '/js/',
        html: _PATH_APP_,
        images: _PATH_APP_ + '/images/',
        fonts: _PATH_APP_ + '/fonts/'
    },
    dest: {},
    watch: {
        css: _PATH_APP_ + '/**/*.css',
        js: _PATH_APP_ + '/**/*.js',
        html: _PATH_APP_ + '/**/*.html',
        images: _PATH_APP_ + '/images/**/*.+(jpeg|jpg|png|gif)',
        fonts: _PATH_APP_ + 'fonts/**/*.+(otf|eot|svg|ttf|woff|woff2)'
    },
    bowerLibs: {
        js: '**/*.js',
        images: '**/*.+(jpg|png|jpeg|gif)',
        sass: '**/*.+(scss|sass)',
        fonts: '**/*.+(otf|eot|svg|ttf|woff|woff2)',
        bootstrapFont: '/bootstrap-sass/assets/fonts/**/*',
        css: '**/*.css'
    }
};

var browseSyncConfig;

browseSyncConfig = {
    server: {
        baseDir: 'app'
    },
    notify: false
};


/* bower */

gulp.task('js', function(){

    var jsFiles;
    jsFiles = filter(_PATH_.bowerLibs.js, {restore: true});

    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(jsFiles)
        .pipe(gulp.dest(_PATH_.app.js))

});

gulp.task('css', function(){

    var cssFiles;
    cssFiles = filter(_PATH_.bowerLibs.css, {restore: true});

    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(cssFiles)
        .pipe(gulp.dest(_PATH_.app.css))
});

gulp.task('bootstrapFont', function(){

    return gulp.src(_BOWER_DIR_ + _PATH_.bowerLibs.bootstrapFont)
        .pipe(gulp.dest(_PATH_.app.fonts));
});

gulp.task('fonts',['bootstrapFont'], function(){

    var fontsFiles;
    fontsFiles = filter(_PATH_.bowerLibs.fonts, {restore: true});

    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(fontsFiles)
        .pipe(gulp.dest(_PATH_.app.fonts));

});

gulp.task('sass', function(){

    var sassFiles;
    sassFiles = filter(_PATH_.bowerLibs.sass, {restore: true});

    return gulp.src(mainBowerFiles({includeDev: true}, {restore: true}))
        .pipe(sassFiles)
        .pipe(sass())
        .pipe(gulp.dest(_PATH_.app.css));

});

gulp.task('load-bower-libs',['js', 'css', 'fonts', 'sass'], function(){});


/* browser sync  */
gulp.task('browser-sync', function(){
    browserSync(browseSyncConfig);
});


gulp.task('watch', ['browser-sync', 'load-bower-libs'], function(){
    gulp.watch(_PATH_BOWER_JSON_, ['load-bower-libs']);
    gulp.watch(_PATH_.watch.css, browserSync.reload);
    gulp.watch(_PATH_.watch.js, browserSync.reload);
    gulp.watch(_PATH_.watch.images, browserSync.reload);
    gulp.watch(_PATH_.watch.photos, browserSync.reload);
    gulp.watch(_PATH_.watch.html, browserSync.reload);
    gulp.watch(_PATH_.watch.json, browserSync.reload);
});

gulp.task('default', ['watch'], function(){});