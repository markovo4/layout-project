const {
  parallel, src, dest, watch, series,
} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')(require('pug'));
const browserSync = require('browser-sync').create();

const firstTask = (done) => {
  console.log('My First Hexlet Task');

  done();
};

const sassCompile = (done) => {
  console.log('Compile SASS to CSS');

  done();
};

const pugCompile = (done) => {
  console.log('Compile Pug to HTML');

  done();
};

const imagesOptimize = (done) => {
  console.log('Optimize Images');

  done();
};
// Run on <<gulp>> in GitBash => will run in parallel all 4 tasks
exports.default = parallel(sassCompile, pugCompile, imagesOptimize, firstTask);

// Run on <<gulp seriesDefault>> in GitBash => will run all 4 tasks one after another
exports.seriesDefault = series(sassCompile, pugCompile, imagesOptimize, firstTask);

const copyScss = () => src(['dist/**/*.scss', '!dist/project/**'])
  .pipe(dest('build/styles'));

// Run on <<gulp copyScssFiles>> in GitBash => will search in dist/ in all <<**> directories for any <<*>> files
// with extension <<.scss>> and exclude <<!>> from search any <<**>> directories/files within <</project/>> directory.
// After the search <<src()>> using Globs <<['dist/**/*.scss', '!dist/project/**']>> files will be copied and placed
// using <<dest()>> into <<'build/styles'>>.
exports.copyScssFiles = copyScss;

const changeFileContent = (done) => {
  console.log('File content has changed');

  done();
};

const changeFileStructure = (done) => {
  console.log('File structure has changed');

  done();
};

const watchers = () => {
  // Watcher that will call the call-back function on change of the file content
  watch('dist/scss/index.scss', { events: 'change' }, changeFileContent);

  // Watcher that will call the call-back function on change of the file structure
  watch('dist/scss/', { events: ['add', 'unlink'] }, changeFileStructure);
};

const buildSass = () => {
  console.log('SASS Compilation');

  return src('dist/scss/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  console.log('Pug Compilation');

  return src('dist/pages/*.pug')
    .pipe(pug())
    .pipe(dest('build/html/'))
    .pipe(browserSync.stream());
};

const browserSyncJob = () => {
  browserSync.init({
    server: 'build/',
  });

  watch('dist/sass/*.scss', buildSass);
  watch('dist/pages/*.pug', buildPug);
};

const development = (done) => {
  console.log('Development Started');

  series(
    parallel(buildSass, buildPug),
    browserSyncJob,
  );
  console.log('Development Finished');

  done();
};

exports.build = development;
exports.watchers = watchers;
