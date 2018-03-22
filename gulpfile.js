const gulp = require('gulp'),
    babel = require('gulp-babel'),
    path = require("path"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    cache = require('gulp-cached'),
    retina = require('retinajs'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin')
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    prettify = require('gulp-prettify'),
    notify = require('gulp-notify'),
    package = require('./package.json');

const paths = {
  templates: 'src/templates',
  fixtures: 'src/fixtures',
  dest: 'app/'
};


const config = {
  browserSync: {
    files: [,
      // "app/*.html",
      "app/assets/img/**/*",
      "app/assets/css/**/*",
      "app/assets/js/**/*"
    ],
    server: {
      baseDir: "app",
      index: "index.html"
    },
    reloadOnRestart: true
  },
  prettify:{
    indent_size: 2
  }
};

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

var onError = function(err){
	notify.onError({
		title:    "Gulp - Party Parrot",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
	})(err);
	this.emit('end');
};

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(plumber({errorHandler: onError}))
  	.pipe(sourcemaps.init())
  	.pipe(sass().on('error', sass.logError))
  	.pipe(autoprefixer('last 4 version'))
  	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('app/assets/css'))
  	.pipe(cssnano())
  	.pipe(rename({ suffix: '.min' }))
  	.pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint('.jshintrc'))
    .pipe(babel({ presets: ['env']}))
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

//compressing images & handle SVG files
gulp.task('images', function(tmp) {
  var src = ['src/assets/img/*.(jpg|png|gif)'];
	gulp.src(src)
	//prevent pipe breaking caused by errors from gulp plugins
	.pipe(plumber({errorHandler: onError}))
	.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
	.pipe(gulp.dest('app/assets/img'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, config.browserSync);
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('access', ['html'], function() {
	return gulp.src('app/**/*.html')
	.pipe(access());
});

gulp.task('html', function(){
  var src = [
    path.join(paths.templates, '**/*.html')
  ];

  return gulp.src(src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(fileinclude())
    // Put template files into base. // Hack
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(prettify(config.prettify))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('build', ['html', 'css', 'js'], function(){
	return true;
});


gulp.task('default', ['build', 'browser-sync'], function () {
	gulp.watch("src/scss/*/*.scss", ['css']);
	gulp.watch("src/js/*.js", ['js']);
  gulp.watch(["src/**/*.html"], ['html']);
	//gulp.watch('app/assets/img/**', ['images']);
});
