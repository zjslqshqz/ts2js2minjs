const os = require('os');
const { execSync } = require('child_process');

/**
 * google_closure_compiler 模块类
 * @description
 * 主要功能是在实例化的时候，根据系统平台自动下载对应的二进制可执行文件<br>
 * google_closure_compiler 模块默认是Java 版本，如果没有Java环境无法执行
 * @class google_closure_compiler
 * @example <caption>加载模块</caption>
 * const google_closure_compiler = require('./lib/google-closure-compiler');
 * const gcc_compiler = new google_closure_compiler();
 * const gcc_compiler_patch = gcc_compiler.installCmd();
 * @example <caption>使用模块</caption>
 *
 *     const { spawn } = require('child_process');
 *
 *     const child = spawn(gcc_compiler_patch, [
 *         '--js',
 *         jsInput,
 *         '--create_source_map',
 *         `${outputMinJsName}.map`,
 *         '--output_wrapper',
 *         `%output% //# sourceMappingURL=${outputMinJsName}.map`,
 *         '--warning_level',
 *         'QUIET',
 *         '--js_output_file',
 *         outputMinJsName
 *     ]);
 *
 *     child.stdout.on('data', (data) => {
 *         console.log(`stdout: ${data}`);
 *     });
 *
 *     child.stderr.on('data', (data) => {
 *         console.error(`构建失败: ${data}`);
 *         process.exit(1);
 *     });
 *
 *     child.on('close', (code) => {
 *         console.log(`构建完成`);
 *         process.exit(code);
 *     });
 */
class google_closure_compiler {
    /**
     * 根据系统或者对应模块
     * @memberOf google_closure_compiler
     * @type {string}
     */
    moduleName = '';
    /**
     * 指定要安装的模块版本号
     * @memberOf google_closure_compiler
     * @type {string}
     */
    moduleVersion = '20230502.0.0';

    /**
     * 构造函数
     * @memberOf google_closure_compiler
     */
    constructor() {
        // 获取当前操作系统类型
        const platform = os.platform();

        // 根据操作系统类型选择要安装的模块名称
        switch (platform) {
            case 'darwin':
                this.moduleName = 'google-closure-compiler-osx';
                break;
            case 'linux':
                this.moduleName = 'google-closure-compiler-linux';
                break;
            case 'win32':
                this.moduleName = 'google-closure-compiler-windows';
                break;
            default:
                console.error(`Unsupported platform: ${platform}`);
                process.exit(1);
        }
    }

    /**
     * 安装 google_closure_compiler 模块
     * @memberOf google_closure_compiler
     * @returns {string}
     */
    installCmd() {
        try {
            // 同步执行 npm install 命令
            execSync(`npm install ${this.moduleName}@${this.moduleVersion}`);
            // 返回模块路径
            return require(this.moduleName);
        } catch (err) {
            console.error(`Error: ${err.message}`);
            throw err;
        }
    }
}

module.exports = google_closure_compiler;
