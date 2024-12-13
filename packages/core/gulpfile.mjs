import { series } from 'gulp';
import dts from 'rollup-plugin-dts';
import RollupTaskFactory from '../../build/RollupTaskFactory.mjs';
import { clearOutDirTask } from '../../build/gulpfile.mjs';

class CoreRollupTaskFactory extends RollupTaskFactory {
    getRollupDefaultConifg() {
        const newConfig = super.getRollupDefaultConifg();
        const { alias } = this.getInnerPlugins();

        newConfig[0].output[0].preserveModules = false;
        newConfig.push({
            input: this.helpers.resolve('./lib/index.ts'),
            external: this.helpers.checkIsExternal.bind(this.helpers),
            plugins: [
                dts(),
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

const tasks = async isWatch => {
    // 创建rollup任务
    const rollupTask = new CoreRollupTaskFactory();
    await series(clearOutDirTask, rollupTask.createTask(isWatch))();
};

export const compile = () => tasks(false);
export const watchCompile = () => tasks(true);
