const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (app, params) => {
    const config = {
        mode: 'production',
        entry: path.resolve('src/index.tsx'),
        output: {
            path: path.resolve('build'),
            publicPath: '/',
            chunkFilename: 'chunk-[name].[contenthash].js',
            filename: 'bundle.[contenthash].js',
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
                    use: { loader: 'ts-loader' },
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.(t|j)sx?$/,
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        failOnWarning: true,
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
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
                maxSize: 90000,
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve('index.html'),
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new Dotenv({
                path: path.resolve(`.${params.env}.env`),
            }),
        ],
    };

    if (params.analyse_bundle === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
