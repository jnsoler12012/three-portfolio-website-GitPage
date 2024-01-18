const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    output: {
        publicPath: '/',
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: {
            rewrites: [{ from: /\//, to: '/404.html' }],
        },
    },
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
                        },
                    }
                ]
            }
        ]
    }
});
