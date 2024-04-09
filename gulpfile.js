const {
  parallel, src, dest, watch, series,
} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('dist/scss/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  console.log('Компиляция Pug');

  return src('dist/pages/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
};

const browserSyncJob = () => {
  browserSync.init({
    server: 'build/',
  });

  watch('dist/sass/*.scss', buildSass);
  watch('dist/pages/*.pug', buildPug);
};

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

//
const changeAppStylesFile = (done) => {
  console.log('Ой, файл index.scss изменился');

  done();
};

const checkFileStructure = (done) => {
  console.log('Изменилась структура файлов');

  done();
};

const watchers = () => {
  // Отслеживание только события `change`
  watch('dist/scss/index.scss', { events: 'change' }, changeAppStylesFile);

  // Отслеживание удаления и добавления файлов в директории
  watch('dist/scss/', { events: ['add', 'unlink'] }, checkFileStructure);
};
//

exports.watchers = watchers;
exports.build = parallel(buildSass, buildPug);
exports.server = browserSyncJob;
