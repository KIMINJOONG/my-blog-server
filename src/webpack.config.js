const path = require("path");

//import path from "path";
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader:"babel-loader"
                    }
                ]
            },
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
};

module.exports = config;