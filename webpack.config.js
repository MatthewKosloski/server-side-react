const webpack = require('webpack');
const cssnano = require('cssnano');
const path = require('path');
const resolve = require('path').resolve;

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

const LOCAL_IDENT_NAME = IS_DEV ? 
    '[name]-scss__[local]-class___[hash:base64:2]' 
: '[hash:base64:2]';

const globals = [
    resolve('./node_modules/normalize.css'), // any NPM module
    resolve('./src/client/scss/globals') // global CSS classes
];

const cssModules = [
    resolve('./src/common')
];

module.exports = {
    devtool: IS_DEV ? 'cheap-eval-source-map' : 'source-map',
    entry: {
        bundle: [
            './node_modules/normalize.css', // any additional node modules
            './src/client/scss/globals', // global styles
            './src/client/app' // entry point
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude:  /node_modules/,
                loader: 'babel'
            },
            // loader for CSS modules
            {
                test: /\.s?css$/,
                loader:  ExtractTextPlugin.extract('style', `css?modules!sass`),
                include: cssModules,
                exclude: globals
            },
            // loader for global styles
            {
                test: /\.s?css$/,
                loader:  ExtractTextPlugin.extract('style', 'css!sass'),
                include: globals,
                exclude: cssModules
            }
        ]
    },
    plugins: IS_DEV ? [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        })
    ] : [
        new webpack.DefinePlugin({
            'process.env':{
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name].min.css', {
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: { 
                discardComments: {
                    removeAll: true 
                } 
            },
            canPrint: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.css', '.scss'],
        alias: {
            bourbon: path.join(__dirname, '/node_modules/bourbon/app/assets/stylesheets/_bourbon.scss'),
            utils: path.join(__dirname, '/src/client/scss/utils')
        }
    }
};