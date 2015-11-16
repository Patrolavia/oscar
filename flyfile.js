import path from 'path'
import cp from 'child_process'
import fs from 'fs'
import _ from 'lodash'
import { Server } from 'karma'
import webpack, { DefinePlugin } from 'webpack'
import webpackConfig from './webpack.config.js'
import browserSync from 'browser-sync'
import spa from 'browser-sync-spa'
import ghPages from 'gh-pages'
import git from 'git-rev-sync'
import jsonminify from 'jsonminify'

const paths = {
  build: path.resolve('build')
}

const config = {
  deploy: {
    message: git.short() + ' - Update ' + (new Date()).toISOString(),
    logger: (message) => console.log(message)
  }
}

let Mock
let isMockStart = false

export function* clear() {
  yield this
    .clear(paths.build)
}

export function* lint() {
  yield this
    .source('src/js/**/*.js')
    .eslint()
}

export function* test() {
  new Server({
    configFile: path.resolve(__dirname, 'karma.conf.js'),
  }).start()
}

export function* compile() {
  yield this
    .source('src/**/*.md')
    .marked()
    .minify({ ext: 'html' })
    .target(paths.build)
  yield this
    .source('src/**/*.json')
    .filter((data) => jsonminify(`${data}`))
    .target(paths.build)
}

export function* mock() {
  if (isMockStart) {
    this.log('Restarting development server.')
    Mock.kill('SIGTERM')
  }

  Mock = (function startup() {
    isMockStart = true
    return cp.fork('./mock.js', {
      env: Object.assign({NODE_ENV: 'development'}, process.env)
    })
  })()

  process.on('exit', () => Mock.kill('SIGTERM'))
}

export function* webpackBuild() {
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin()
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  )

  yield this
    .source('src/js/index.js')
    .webpack(webpackConfig)
}


export function* replacePath() {
  fs.readFile('build/index.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/(\w+-[^utf\-8][^=]*)"/g, '{{.}}$&');

    fs.writeFile('build/index.html', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}

export function* release() {
  config.deploy.branch = 'release'
  ghPages.publish(paths.build, config.deploy)
}

export function* master() {
  config.deploy.branch = 'master'
  ghPages.publish('build', config.deploy)
}

export function* view() {
  const options = {
    server: {
      baseDir: paths.build
    },
    port: 4000,
    logPrefix: 'Laima',
    logConnections: true
  }

  browserSync(options)
  browserSync.use(spa())
}

export default function* () {
  yield this
    .start(['clear'])
  yield this
    .watch('src/**/*.+(md|json)', 'compile')
  yield this
    .watch(['./mock.js', './api.js'], 'mock')

  const server = (function startup() {
    return cp.fork('./server.js', {
      env: Object.assign({NODE_ENV: 'development'}, process.env)
    })
  })();

  process.on('exit', () => server.kill('SIGTERM'))
}

export function* prebuild() {
  yield this
    .start(['lint', 'test'], { parallel: true })
}

export function* build() {
  yield this
    .start(['clear', 'compile', 'webpackBuild', 'replacePath'])
}
