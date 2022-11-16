const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    mode: process.env.NODE_ENV,
    
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, "build"),
          publicPath: "/",
        },
        proxy: {
        },
      },
}