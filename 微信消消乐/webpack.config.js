var path = require('path');
var webpack = require('webpack');

var env = process.env.NODE_ENV || 'development';

var definePlugin = new webpack.DefinePlugin({
    __DEV__: env!=="production"
});

var plugins = [
    definePlugin
];

/**************************************************************************************************************************
 **
 */
module.exports = {
    entry: {
        app: [  path.resolve(__dirname, 'js/Main.js') ]
    },
    // devtool: 'source-map',
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, './bin'), 
        filename: 'bundle.[name].js'
    },
    watch: false,
    plugins: plugins,
    module: {
        rules: [ { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'js') } ]
    },
    resolve: {
        modules: [
          path.resolve('./js')
        ], 
        alias: {

        }
    }
};