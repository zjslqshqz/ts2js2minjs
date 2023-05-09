#!/usr/bin/env node

const ts2js2minjs = require('../index');
const path = require("path");
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('请指定您要编译的 TypeScript 文件的路径。');
    process.exit(1);
}

const tsPath = args[0];
process.chdir(path.dirname(tsPath));

ts2js2minjs(tsPath);
