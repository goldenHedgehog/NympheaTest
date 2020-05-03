'use strict';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var version = require("./package.json");
var myversion = JSON.stringify(version);
var ver = JSON.parse(myversion).version;
console.log("FLOGS ver ",JSON.parse(myversion).version);


var config =[];

var entery = {
    index: [
        './src/index.js',
        'jquery',
        'react',
        'react-dom',
        'material-components-web/dist/material-components-web.min.js',
        'devextreme/integration/jquery',
        'devextreme/dist/js/dx.all.js',
        'devextreme/ui/file_uploader',
        'devextreme/ui/data_grid',
        //'devextreme/data/custom_store',
        'devextreme/data/data_source',
        //'devextreme/ui/color_box',
        'json-2-csv',
        'brace'
    ]
}
var modulesAll = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            }
        },
        {
            test: /\.less$/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader",
                    options: {  sourceMap: true, }
                },
                {loader: "less-loader",
                    options: {
                        sourceMap: true,
                  paths: [
                            path.resolve(__dirname, "node_modules")
                        ]
                    }
                }]
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        },
        {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"}
    ]
};
  var splitChunksM ={
    cacheGroups: {
        vendorView: {
            test: /[\\/]node_modules[\\/](devextreme|material-components-web)[\\/]/,
            chunks: "initial",
            name: "vendorView",
            priority: 10,
            enforce: true
        },
        vendorLogic:{
            test: /[\\/]node_modules[\\/](jquery|react|react-dom|brace|json-2-csv)[\\/]/,
            chunks: "initial",
            name: "vendorLogic",
            priority: 10,
            enforce: true
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
};
   var pluginsM = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        _ : "underscore"
    }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDom: 'react-dom'
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        Nya : [__dirname+"/nymphea/public/nymphea.v_0.0.5.js",'default'], //подключение моих вп модулей
        _ : "underscore"
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        React: 'react',
        _ : "underscore",
        NyaUI : [__dirname+"/nymphea/public/nymphea_UI.v_0.0.4.js",'default'], //подключение моих вп модулей
        // NyaUI : [__dirname+"/nymphea/ui/public/nymphea_UI.v_0.0.4.js",'default'], //подключение моих вп модулей
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        Alertify : __dirname+"/node_modules/devextreme/ui/notify",
        Tooltip: __dirname+"/node_modules/devextreme/ui/tooltip",
        CustomStore: __dirname+"/node_modules/devextreme/data/custom_store",
    })
   ]
var pluginsDEV = pluginsM;
var pluginsPROD = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        _ : "underscore"
    }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDom: 'react-dom'
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        Nya : [__dirname+"/nymphea/public/nymphea.v_0.0.5.js",'default'], //подключение моих вп модулей
        _ : "underscore"
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        React: 'react',
        _ : "underscore",
        NyaUI : [__dirname+"/nymphea/public/nymphea_UI.v_0.0.4.js",'default'], //подключение моих вп модулей
        // NyaUI : [__dirname+"/nymphea/ui/public/nymphea_UI.v_0.0.4.js",'default'], //подключение моих вп модулей
    }),
    new webpack.ProvidePlugin({
        $ : "jquery",
        Alertify : __dirname+"/node_modules/devextreme/ui/notify",
        Tooltip: __dirname+"/node_modules/devextreme/ui/tooltip",
        CustomStore: __dirname+"/node_modules/devextreme/data/custom_store",
    }),
    new BundleAnalyzerPlugin()
]
    /**/
var DEVconf = [{
    name:"project",
    mode: 'development',
    entry: entery,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].v_'+ver+'.js',
        //publicPath:'/s/dist/public/',
        publicPath:__dirname+'/public/',
        library:"[name]",
        libraryTarget: 'umd'
    },
    devtool : 'source-map',
    watch : true,
    watchOptions : {
        aggregateTimeout:100
    },
    optimization:{
        splitChunks: splitChunksM
    },
    module: modulesAll,
    plugins:pluginsDEV
}];
var PROD = [{
    name:"project",
    mode: 'production',
    entry: entery,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].v_'+ver+'.js',
        publicPath:__dirname+'/public/',
        library:"[name]",
        libraryTarget: 'umd'
    },
    devtool : false,
    watch : false,
    optimization:{
        splitChunks: splitChunksM,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ]
    },
    module: modulesAll,
    plugins:pluginsPROD
}];


var configCSS =[{
    name:"css",
    entry:{
        styles: [
            'material-components-web/dist/material-components-web.min.css',
            'devextreme/dist/css/dx.common.css',
            'devextreme/dist/css/dx.light.compact.css'
        ]
    },
    output:{
        path: __dirname+"/public",
    },
    optimization:{
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module:{
        rules: [
            {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"},
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ]
}]


module.exports = (env, argv) => {
    console.log(env, argv)
    if (argv.mode === 'development') {
        if(argv.configName == 'project'){
            config = DEVconf;
            console.log("DEVconf",DEVconf)
        }else if(argv.configName == 'css'){
            config = configCSS;
            console.log("configCSS",config,configCSS)
        }
    } else if(argv.mode === 'production'){
        config = PROD;
    }
    console.log("config",config)
    return config;
};