const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: process.env.NODE_ENV,
    
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            publicPath: '/',
        })
    ],

    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader",]
            },
            //     ---in index.html above document
            {
                test: /.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        ]
    },

    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, "dist"),
          publicPath: "/",
        },
        proxy: {
        },
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
}