var path = require('path');
var webpack = require("webpack");
module.exports = function(config) {
  config.set({

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/index.js'
    ],

    // frameworks to use
    frameworks: ['mocha', 'sinon'],

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

    singleRun: true,

    webpack: {
      // webpack configuration
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel', exclude: /node_modules|bower_components/},
          {test: /\.json$/, loader: 'json'}
        ],
        preLoaders: [{
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'isparta-instrumenter'
        }]
      },
      resolve: {
        alias: {
          'actions': path.resolve(__dirname, 'src', 'js', 'actions'),
          'components': path.resolve(__dirname, 'src', 'js', 'components'),
          'containers': path.resolve(__dirname, 'src', 'js', 'containers'),
          'reducers': path.resolve(__dirname, 'src', 'js', 'reducers'),
          'store': path.resolve(__dirname, 'src', 'js', 'store'),
          'utils': path.resolve(__dirname, 'src', 'js', 'utils'),
          'locales': path.resolve(__dirname, 'src', 'locales')
        }
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    browsers: ['PhantomJS']
  });
};
