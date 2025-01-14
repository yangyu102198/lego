import dts from 'rollup-plugin-dts';
import RollupTaskFactory from '../../build/RollupTaskFactory.mjs';
import { clearOutDirTask, TaskRunner } from '../../build/gulpfile.mjs';

class CoreRollupTaskFactory extends RollupTaskFactory {
    getRollupDefaultConifg() {
        const newConfig = super.getRollupDefaultConifg();
        const { alias } = this.getInnerPlugins();

        newConfig[0].output[0].preserveModules = false;
        newConfig.push({
            input: this.helpers.resolve('./lib/index.ts'),
            external: this.helpers.checkIsExternal.bind(this.helpers),
            plugins: [
                dts({
                    compilerOptions: {
                        preserveSymlinks: false
                    }
                }),
                alias({
                    entries: this.helpers.getPathAlias()
                })
            ],
            output: [
                {
                    format: 'es',
                    file: `${this.helpers.getOutDir()}/index.d.ts`
                }
            ]
        });
        return newConfig;
    }
}

const tasks = taskRunner => async () => {
    // 创建rollup任务
    const rollupTask = new CoreRollupTaskFactory(taskRunner);
    await TaskRunner.series(
        clearOutDirTask(taskRunner),
        rollupTask.createTask()
    )();
};

const taskRunner = new TaskRunner();

export const compile = () => taskRunner.runTask(tasks);
export const watchCompile = () => taskRunner.runTask(tasks, true);
