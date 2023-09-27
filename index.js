const path = require('path');
const { spawn } = require('child_process');
const fs= require('fs');
const tsc = require('typescript');

module.exports = (tsPath,tsOptions) => {

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
    // 获取 google_closure_compiler 模块和地址
    const google_closure_compiler = require(path.join(__dirname,'lib','google-closure-compiler'));
    const gcc_compiler = new google_closure_compiler();
    const gcc_compiler_patch = gcc_compiler.installCmd()
    console.log('开始构建 min.js 和 map 文件...');
    const child = spawn(gcc_compiler_patch, [
        '--js',
        jsInput,
        '--create_source_map',
        `${outputMinJsName}.map`,
        '--output_wrapper',
        `%output% //# sourceMappingURL=${outputMinJsName}.map`,
        '--warning_level',
        'QUIET',
        '--js_output_file',
        outputMinJsName
    ]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`构建失败: ${data}`);
        process.exit(1);
    });

    child.on('close', (code) => {
        console.log(`min.js map 文件 构建完成`);
        process.exit(code);
    });
};
