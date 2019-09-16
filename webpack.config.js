module.exports = {
    entry: "./src/RedVue.ts",
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    output: {
        path: __dirname,
        filename: "./dist/RedVue.js",
        libraryTarget: "commonjs"
    }
}