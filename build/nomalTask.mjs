import fs from 'fs-extra';

export const clearOutDirTask = taskRunner =>
    async function clearOutDir() {
        const targetDir = taskRunner.helper.getOutDir();
        await Promise.all([fs.emptyDir(targetDir)]);
    };
