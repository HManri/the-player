const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = (env) => {
    const mode = env.mode;
    // const isProduction = mode === 'production';

    const configuration = {
        entry: './src/app/index.jsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js',
            pathinfo: false,
        },
        optimization: {
            // avoid extra optimization steps in develop
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },
        devServer: {
            open: true,
            overlay: {
                warnings: true,
                errors: true,
            },
            inline: true,
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, 'src/app'), 'node_modules'],
        },
        module: {
            rules: [
                // first eslint-loader to avoid babel effect
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    use: 'eslint-loader',
                    include: [path.resolve(__dirname, 'src/app')],
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.(sa|sc|c)ss$/,
                //     use: [
                //         isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                //         'css-loader',
                //         'sass-loader',
                //     ],
                //     include: path.resolve(__dirname, 'src/app'),
                //     exclude: /node_modules/,
                // },
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-react', '@babel/preset-env'],
                            },
                        },
                    ],
                    include: [path.resolve(__dirname, 'src/app')],
                    exclude: /node_modules/,
                },
            ],
        },
        mode: mode,
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                // minify: true,
                template: './src/www/index.html',
                filename: './index.html',
            }),
            // new CopyWebpackPlugin({
            //     patterns: [{ from: path.resolve(__dirname, 'src/www') }],
            // }),
            // new CopyWebpackPlugin([
            //     {
            //         from: path.resolve(__dirname, 'src/www'),
            //     },
            // ]),
        ],
    };

    // if (isProduction) {
    //     configuration.plugins.push(new MiniCssExtractPlugin({ filename: 'css/styles.css' }));
    // }

    return configuration;
};

module.exports = config;
