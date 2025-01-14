import { spawn } from 'child_process';

export const createDtsTask = taskRunner =>
    async function dtsTask() {
        await taskDts(taskRunner.isWatch);
    };

const taskDts = isWatch => {
    return new Promise((resolve, reject) => {
        const spawnArgs = [
            '--project',
            './tsconfig.json',
            '--noEmit',
            'false',
            '--declaration',
            '--emitDeclarationOnly',
            '--declarationDir',
            './dist'
        ];
        if (isWatch) {
            spawnArgs.push('--watch');
        }
        let childProcess = spawn('vue-tsc', spawnArgs);
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);

        childProcess.on('close', code => {
            if (code) {
                reject(code);
            } else {
                resolve();
            }
        });
    });
};
