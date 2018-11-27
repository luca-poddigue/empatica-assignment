const gulp = require('gulp');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
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
const gulpInject = require('gulp-inject');


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

/**
 * Deletes all the files from the previous build.
 */
gulp.task('clean', function () {
    return del(outputDir);
});

/**
 * Processes Javascript files. The channel does:
 * <ul>
 *     <li>AngularJS annotation, to prevent minification to break dependency injection.</li>
 *     <li>Javascript transpilation, to ensure compatibility with old browsers.</li>
 *     <li>Minification</li>
 * </ul>
 */
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

/**
 * Processes CSS files. The channel does:
 * <ul>
 *     <li>Autoprefixing, to ensure compatibility with old browsers.</li>
 *     <li>Minification</li>
 * </ul>
 */
function cssChannel() {
    const channel = lazypipe()
        .pipe(autoprefixer, {
            browsers: ['> 1%'],
            cascade: false
        })
        .pipe(uglifycss, {
            'uglyComments': true
        });
    return channel();
}

/**
 * Processes HTML files. The task does:
 * <ul>
 *     <li>Minification</li>
 *     <li>Registers the files in the static asset revisioning context, used later to replace file references with their hashed names.
 * </ul>
 */
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

/**
 * Processes the index.html file.
 * <ul>
 *     <li>Identifies required js and css files based on the references declared in the index file.</li>
 *     <li>Sends the files to their respective channels.</li>
 *     <li>Registers the files in the static asset revisioning context, used later to replace file references with their hashed names.
 * </ul>
 */
gulp.task('index', function () {
    return gulp.src(appDir + '/index.html', {base: appDir})
        .pipe(useref({
            noconcat: true,
            searchPath: appDir
        }))
        .pipe(gulpif(file => file.history[0].endsWith(".js") && !file.history[0].endsWith('.min.js'), jsChannel()))
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

/**
 * Uses the previously generated static assets revisioning context to replace file references with their hashed names in js and html files.
 */
gulp.task("revReplace", function () {
    const manifest = gulp.src(revManifestPath);
    return gulp.src([outputDir + "/**/*.{css,js,html}"])
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(outputDir));
});

/**
 * Clears the static assets revisioning context.
 */
gulp.task('cleanRevManifest', function () {
    return del(revManifestPath);
});

/**
 * Copies all the required font files to the dist folder.
 */
gulp.task('copyFontFiles', function () {
    return gulp.src(appDir + '/common/fonts/**/*')
        .pipe(gulp.dest(outputDir + '/common/fonts'));
});

/**
 * Copies all the required image files to the dist folder.
 */
gulp.task('copyImages', function () {
    return gulp.src([appDir + '/**/*.{jpg,png,svg}',
        '!' + appDir + '/lib/**/*.{jpg,png,svg}'])
        .pipe(rev())
        .pipe(gulp.dest(outputDir))
        .pipe(rev.manifest(revManifestPath, {
            base: outputDir,
            merge: true
        }))
        .pipe(gulp.dest(outputDir));
});

/**
 * The full build.
 */
gulp.task('build', function () {
    return runSequence('clean', ['copyImages', 'copyFontFiles'], ['html', 'index'], 'revReplace');
});

/**
 * Automatically writes references in index.html based on the files contained in the app folder. For dev purposes.
 */
gulp.task('assets', function () {
    var target = gulp.src(appDir + '/index.html');
    var sources = gulp.src([
        appDir + '/*.{js,css}',
        appDir + '/**/*.{js,css}',
        '!' + appDir + '/lib/**/*.{js,css}',
        '!' + appDir + '/**/*.spec.{js,css}',
    ], {
        read: false
    });

    return target.pipe(gulpInject(sources, {
        relative: true
    }))
        .pipe(gulp.dest(appDir));
});


gulp.task('default', ['build']);