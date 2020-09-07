const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = (env) => {
    const mode = env.mode;

    const configuration = {
        entry: './src/app/index.jsx',
        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'app.js',
            pathinfo: false,
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
                template: './src/www/index.html',
                filename: './index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [{ from: path.resolve(__dirname, 'src/www') }],
            }),
        ],
    };

    if (mode !== 'production') {
        configuration.optimization = {
            // avoid extra optimization steps in development
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        };
    }

    return configuration;
};

module.exports = config;
