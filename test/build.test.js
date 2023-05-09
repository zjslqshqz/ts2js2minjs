const fs = require('fs');
import { spawnSync } from 'child_process';

describe('run ts2js2minjs', () => {
    test('my test case', () => {
        const result = spawnSync('npm', ['run', 'ts2js2minjs']);
        expect(result.status).toBe(0);
    });
});

describe('test build files', () => {
    test('check if file .js', () => {
        expect(fs.existsSync('./example/code.js')).toBe(true);
    });

    test('check if file .js.map', () => {
        expect(fs.existsSync('./example/code.js.map')).toBe(true);
    });

    test('check if file .min.js', () => {
        expect(fs.existsSync('./example/code.min.js')).toBe(true);
    });

    test('check if file .min.js.map', () => {
        expect(fs.existsSync('./example/code.min.js.map')).toBe(true);
    });

});

