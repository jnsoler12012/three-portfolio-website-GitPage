const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/dist`,
        clean: true,
        filename: '[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Images: path.resolve(__dirname, 'src/UI/assets/img/'),
            Models3D: path.resolve(__dirname, 'src/UI/assets/3d/'),
            Icons: path.resolve(__dirname, 'src/UI/assets/icons/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.template.ejs'),
            favicon: path.resolve(__dirname, 'src/UI/assets/ico/dashboard.ico'),
            title: 'Portfolio Nicolas Soler',
            inject: true,
        }),
        new Dotenv({
            path: '.env',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        compact: false
                    },

                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    target: ["web", "es5"],
};