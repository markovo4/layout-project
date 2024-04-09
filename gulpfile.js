const {
  parallel, src, dest, watch, series,
} = require('gulp');

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
