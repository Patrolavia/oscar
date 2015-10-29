var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/index.js'
    ],

    // frameworks to use
    frameworks: ['mocha'],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: 'build/coverage/',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'text-summary'}
      ]
    },

    webpack: {
      // webpack configuration
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel'}
        ],
        preLoaders: [{
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'isparta-instrumenter'
        }]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    browsers: ['PhantomJS']
  });
};
