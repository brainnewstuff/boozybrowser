'use strict';

import gulp from 'gulp';
import config from '../config';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';

gulp.task('browserify', () => {
    // Grabs the app.js file
    return browserify(config.scripts.appSrc)
        .transform(babelify, {presets: ['es2015', 'react']})
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest(config.scripts.dest));
});
