const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

let _plugins = [
    new CleanWebpackPlugin() ,
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }) ,
    new MiniCssExtractPlugin({
        filename: '../css/app.bundle.css'
    })
];

let paths = fs.readdirSync('resources/views/windows');
for (let i = 0; i < paths.length; i++) {
    if (paths[i].indexOf('.pug') > 0 && paths[i].charAt(0) !== '_') {
        _plugins.push(
            new HtmlWebpackPlugin({
                template: './resources/views/windows/' + paths[i] ,
                filename: '../html/' + paths[i] + '.html',
                inject: false
            })
        );
    }
}

module.exports = {
    watch: true,
    mode: 'development',
    entry: ['./resources/js/app.js' , './resources/sass/app.sass'] ,
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'assets/js')
    } ,
    plugins: _plugins ,
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            } ,
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/ ,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../font'
                        }
                    }
                ]
            } ,
            {
                test: /\.(png|svg|jpg|gif)$/ ,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../img'
                        }
                    }
                ]
            } ,
            {
                test: /\.pug$/,
                use: ['pug-loader']
            }
        ]
    }
};