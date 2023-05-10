# 说明

[![npm](https://img.shields.io/badge/os-linux%20%7C%20darwin%20%7C%20%20win32-green)](https://www.npmjs.com/package/ts2js2minjs)
[![npm](https://img.shields.io/node/v-lts/ts2js2minjs)](https://www.npmjs.com/package/ts2js2minjs)
[![npm](https://img.shields.io/npm/v/ts2js2minjs)](https://www.npmjs.com/package/ts2js2minjs)

[![npm](https://img.shields.io/npm/dw/ts2js2minjs)](https://www.npmjs.com/package/ts2js2minjs)

[![npm](https://img.shields.io/npm/dependency-version/ts2js2minjs/typescript)](https://www.npmjs.com/package/typescript)
[![npm](https://img.shields.io/npm/dependency-version/ts2js2minjs/lodash)](https://www.npmjs.com/package/lodash)
[![npm](https://img.shields.io/npm/dependency-version/ts2js2minjs/yargs)](https://www.npmjs.com/package/yargs)

本项目使用的 `google--closure--compiler` 二进制版本:

[![npm](https://img.shields.io/badge/google--closure--compiler--osx-20230502.0.0-blue)](https://www.npmjs.com/package/google-closure-compiler-osx)
[![npm](https://img.shields.io/badge/google--closure--compiler--windows-20230502.0.0-blue)](https://www.npmjs.com/package/google-closure-compiler-windows)
[![npm](https://img.shields.io/badge/google--closure--compiler--linux-20230502.0.0-blue)](https://www.npmjs.com/package/google-closure-compiler-linux)


这是一个在编译 `.ts` 文件同时生成`.js`,`.min.js`的模块。

生成的文件都在 `ts` 文件的同级目录。

## 使用方法

```bash
npm run ts2js2minjs test/code.ts
```

### 设置 ts compilerOptions 参数

手动指定配置文件地址,参数`--tsc_conf | --tsc`
```bash
ts2js2minjs.js example/code.ts --tsc=ts.config.json
```

默认参数，格式
```json
{
  "compilerOptions": {
    "target": "es6",
    "noImplicitAny": true,
    "sourceMap": true,
    "inlineSources": true
  }
}
```

