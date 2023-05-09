const path = require('path');
const fs = require('fs');
const tsc = require('typescript');
const gcc_compiler = require('google-closure-compiler').compiler;

module.exports = (tsPath) => {

    const tsSourcePath = path.basename(tsPath);
    const jsInput = path.basename(tsSourcePath, '.ts') + '.js';
    const outputMinJsName = path.basename(tsSourcePath, '.ts') + '.min.js';

    if (!fs.existsSync(tsSourcePath)) {
        console.error(`ts 源文件 ${tsSourcePath} 不存在`);
        process.exit(1);
    }
    // 读取 ts 文件
    const tsContent = fs.readFileSync(tsSourcePath, 'utf8');
    console.log('正在编译 TypeScript 文件...');
    const tsOptions = {
        target: 'es6',
        noImplicitAny: true,
        sourceMap: true,
        inlineSources: true
    };
    try {
        const result = tsc.transpileModule(tsContent, {
            fileName:tsSourcePath,
            compilerOptions: tsOptions
        });
        fs.writeFileSync(jsInput, result.outputText, { encoding: 'utf8' });
        fs.writeFileSync(jsInput+'.map', result.sourceMapText, { encoding: 'utf8' });
        console.log('TypeScript 文件编译完成！');
    }catch (e) {
        console.log('TypeScript 文件编译编译失败:', e.toString());
        process.exit(1);
    }

    // 编译 min.js
    console.log('正在构建 min.js 和 map 文件...');
    const closureCompiler = new gcc_compiler({
        js: jsInput,
        create_source_map: `${outputMinJsName}.map`,
        output_wrapper: `"%output% //# sourceMappingURL=${outputMinJsName}.map"`,
        warning_level: 'QUIET',
        js_output_file: outputMinJsName,
    });
    closureCompiler.run((exitCode, stdOut, stdErr) => {
        //compilation complete
        if (stdErr) {
            console.error('构建失败：',stdErr);
            process.exit(1);
        } else {
            console.log('构建完成！',stdOut);
            process.exit(exitCode);
        }
    });
};
