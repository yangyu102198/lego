import { parallel, series } from 'gulp';
import { createSassTask } from './sassTask.mjs';
import { Helpers } from './Helpers.mjs';
import RollupTaskFactory from './RollupTaskFactory.mjs';
import { createDtsTask } from './dtsTask.mjs';
import { clearOutDirTask } from './nomalTask.mjs';

const compositeTasks = taskRunner => async () => {
    // 创建rollup任务
    const rollupTask = new RollupTaskFactory(taskRunner);
    await series(
        clearOutDirTask(taskRunner),
        parallel(
            createSassTask(taskRunner),
            rollupTask.createTask(),
            createDtsTask(taskRunner)
        )
    )();
};

class TaskRunner {
    static parallel = parallel;
    static series = series;
    constructor() {
        this.helper = Helpers;
        this.isWatch = false;
    }

    runTask(task, isWatch = false) {
        this.isWatch = isWatch;
        return task(this)();
    }
    watch() {
        this.isWatch = true;
        return this;
    }
}

export { TaskRunner, compositeTasks, clearOutDirTask, Helpers };
