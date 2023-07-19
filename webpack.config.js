const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/handler.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'handler.js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
