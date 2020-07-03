const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'development',
    entry:  './resources/js/app.js' ,
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
    }/*,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
        ]
    }*/
};