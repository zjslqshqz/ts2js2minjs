#!/usr/bin/env node

const ts2js2minjs = require('../index');
const path = require("path");
const { merge } = require('lodash');
const yargs = require('yargs');
const {readFileSync,existsSync} = require("fs");
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('请指定您要编译的 TypeScript 文件的路径。');
    process.exit(1);
}

const argv = yargs.option('tsc_conf', {
    alias: 'tsc',
    type: 'string',
    description: 'ts.config.json 文件路径, 参考 ts 配置文件',
}).argv;

const tsPath = path.normalize(args[0]);
// 设置执行路径 默认为文档所在目录
process.chdir(path.dirname(tsPath));

// ts compilerOptions 默认参数
const defTSOption = {
    target: 'es6',
    noImplicitAny: true,
    sourceMap: true,
    inlineSources: true
}

if (argv.tsc_conf){
    let tsConfigPath = path.normalize(argv.tsc_conf);
    //
    if (!existsSync(tsConfigPath)){
        console.error('tsc_conf 配置文件:',tsConfigPath,'不存在')
        process.exit(1);
    }
    //
    let tsOptions = tsConfigPath
        ? merge(defTSOption, JSON.parse(readFileSync(tsConfigPath).toString()).compilerOptions)
        : defTSOption;
    ts2js2minjs(tsPath,tsOptions);
}else {
    ts2js2minjs(tsPath,defTSOption);
}
