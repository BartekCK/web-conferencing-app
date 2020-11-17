const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (app, params) => {
    const config = {
        mode: 'development',
        devtool: 'source-map',
        entry: path.resolve('src/index.tsx'),
        output: {
            path: path.resolve('public'),
            publicPath: '/',
            chunkFilename: 'chunk-[name].[contenthash].js',
            filename: 'bundle.[contenthash].js',
        },
        devServer: {
            liveReload: true,
            open: process.platform === 'linux' ? 'google-chrome' : 'Google Chrome',
            historyApiFallback: true,
            host: 'be.meet.pl',
            port: 8080,
            https: true,
            overlay: true,
        },
        resolve: {
            modules: [
                path.resolve(__dirname, './node_modules'),
                path.resolve(__dirname, './src'),
            ],
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(t|j)sx?$/,
                    use: { loader: 'eslint-loader' },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/i,
                        chunks: 'all',
                        priority: 1,
                    },
                },
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve('index.html'),
            }),
            new Dotenv({
                path: path.resolve('.env'),
            }),
            new ForkTsCheckerWebpackPlugin(),
        ],
    };

    return config;
};
