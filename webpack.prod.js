const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const TerserPlugin = require('terser-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    output: {
        publicPath: './dist/',
    },
    devtool: "source-map",
    plugins: [
        //new BundleAnalyzerPlugin(),
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['node copy-html-hashed.js'],
                blocking: false,
                parallel: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jpe?g|gif|png|svg|glb|gltf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets',
                            name: `[contenthash].[ext]`,
                            publicPath: './dist/assets/',
                        },
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 17000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: "_",
            enforceSizeThreshold: 30000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: "vendors",
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                defaultVendors: false,
                reactPackage: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: 'vendor_react',
                    chunks: "all",
                    priority: 10,
                }
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
});