'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const csscomb = require('gulp-csscomb');
const useref = require('gulp-useref');
const uglifycss = require('gulp-uglifycss');
const del = require('del');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');
const lazypipe = require('lazypipe');
const gulpif = require('gulp-if');
const revReplace = require('gulp-rev-replace');
const rev = require('gulp-rev');
const babel = require('gulp-babel');


const outputDir = 'dist';
const appDir = 'app';
const revManifestPath = outputDir + '/rev-manifest.json';

const htmlminConfig = {
    collapseWhitespace: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeIgnored: true
};

gulp.task('clean', function () {
    return del(outputDir);
});

function jsChannel() {
    const channel = lazypipe()
        .pipe(babel, {
            plugins: ['angularjs-annotate'],
            presets: [['@babel/preset-env',
                {
                    targets: 'last 1 version, not dead, > 0.2%',
                    ignoreBrowserslistConfig: true
                }
            ]]
        })
        .pipe(uglify);
    return channel();
}


function cssChannel() {
    const channel = lazypipe()
        .pipe(autoprefixer, {
            browsers: ['> 1%'],
            cascade: false
        })
        .pipe(csscomb)
        .pipe(uglifycss, {
            'uglyComments': true
        });
    return channel();
}

gulp.task('html', function () {
    return gulp.src([appDir + '/*.html',
            appDir + '/**/*.html',
            '!' + appDir + '/index.html',
            '!' + appDir + '/lib/**/*.html'],
        {base: appDir})
        .pipe(htmlmin(htmlminConfig))
        .pipe(replace(appDir + '/', ''))
        .pipe(rev())
        .pipe(gulp.dest(outputDir))
        .pipe(rev.manifest(revManifestPath, {
            base: outputDir,
            merge: true
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('index', function () {
    return gulp.src(appDir + '/index.html', {base: appDir})
        .pipe(useref({
            noconcat: true,
            searchPath: appDir
        }))
        .pipe(gulpif(function (file) {
            debugger;
            return file.history[0].endsWith(".js") && !file.history[0].endsWith('.min.js');
        }, jsChannel()))
        .pipe(gulpif('*.css', cssChannel()))
        .pipe(gulpif('*.html', htmlmin(htmlminConfig)))
        .pipe(gulpif('!**/index.html', rev()))
        .pipe(gulp.dest(outputDir))
        .pipe(rev.manifest(revManifestPath, {
            base: outputDir,
            merge: true
        }))
        .pipe(gulp.dest(outputDir));

});

gulp.task("revReplace", function () {
    const manifest = gulp.src(revManifestPath);
    return gulp.src([outputDir + "/**/*.{js,html}"])
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(outputDir));
});

gulp.task('cleanRevManifest', function () {
    return del(revManifestPath);
});

gulp.task('incorporateFontFiles', function () {
    return gulp.src(appDir + '/fonts/**/*')
        .pipe(gulp.dest(outputDir + '/fonts'));
});

gulp.task('incorporateImages', function () {
    return gulp.src([appDir + '/**/*.{png,svg}',
        '!' + appDir + '/lib/**/*.{png,svg}'])
        .pipe(gulp.dest(outputDir))
        .pipe(rev.manifest(revManifestPath, {
            base: outputDir,
            merge: true
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('build', function () {
    return runSequence('clean', 'incorporateImages', 'html', 'index', 'revReplace');
});

gulp.task('default', ['build']);