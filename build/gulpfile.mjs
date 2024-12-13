import { parallel, series } from 'gulp';
import fs from 'fs-extra';
import { createSassTask } from './sassTask.mjs';
import { Helpers } from './Helpers.mjs';
import RollupTaskFactory from './RollupTaskFactory.mjs';
import { createDtsTask } from './dtsTask.mjs';
let helper = Helpers;

const clearOutDirTask = async () => {
    const targetDir = helper.getOutDir();
    await Promise.all([fs.emptyDir(targetDir)]);
};

const tasks = async isWatch => {
    // 创建rollup任务
    const rollupTask = new RollupTaskFactory(helper);
    await series(
        clearOutDirTask,
        parallel(
            createSassTask(isWatch),
            rollupTask.createTask(isWatch),
            createDtsTask(isWatch)
        )
    )();
};

const setHelper = Helpers => {
    helper = Helpers;
};
export const compile = () => tasks(false);
export const watchCompile = () => tasks(true);
export { clearOutDirTask, createSassTask, setHelper };
