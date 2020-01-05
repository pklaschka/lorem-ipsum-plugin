/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/main.js',
        libraryTarget: 'commonjs2'
    },
    devtool: false,
    target: 'node',
    externals: {
        assets: 'assets',
        scenegraph: 'scenegraph',
        application: 'application',
        commands: 'commands',
        clipboard: 'clipboard',
        cloud: 'cloud',
        uxp: 'uxp',
        viewport: 'viewport',
        interactions: 'interactions'
    },
    mode: 'development',
    plugins: [
        // new webpack.DefinePlugin({
        //
        // });
    ]
};
