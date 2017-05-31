'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var merge = require('webpack-merge');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname);
var DEMO_DIR = 'Examples';
var config = {
  paths: {
    src: path.join(ROOT_PATH, 'Libraries'),
    demo: path.join(ROOT_PATH, DEMO_DIR),
    demoIndex: path.join(ROOT_PATH, DEMO_DIR, '/UIExplorer/UIExplorerApp.web'),
    index:path.join(ROOT_PATH, DEMO_DIR,'dgt/index.web'),
    portal:path.join(ROOT_PATH, DEMO_DIR,'dgt/portal.web'),
  }
};

var mergeCommon = merge.bind(null, {
  resolve: {
    alias: {
      'react-native': 'ReactWeb',
      'ReactART': 'react-art'
    },
    extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
  },
  module: {
    loaders: [{
      test: /\.png$/,
      loader: 'url?limit=100000&mimetype=image/png',
      include: config.paths.demo,
    }, {
      test: /\.jpg$/,
      loader: 'file',
      include: config.paths.demo,
    }, {
      test: /\.json$/,
      loader: 'json',
    }, ]
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      blacklist: ['lib']
    }),
  ]
});


function mergeRW(entry,outputPath){
 return mergeCommon({
    devtool: 'source-map',
    entry: {
      // tweak this to include your externs unless you load them some other way
      'react-web': ['react-native'],
      dgt: entry
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      sourceMapFilename: '[file].map',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      }),
      new webpack.optimize.CommonsChunkPlugin('react-web', 'react-web.js'),
      
        new HtmlPlugin({
        filename: 'dgt.html',
        hash: true,
        title: 'Dgt',
        chunks: ['react-web', 'dgt']
      }),
      
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react-native', 'stage-1']
        },
        include: [config.paths.demo, config.paths.src],
      }]
    }
  });
}



  module.exports = mergeRW;

