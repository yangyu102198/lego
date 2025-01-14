import { rollup, watch as rollupWatch } from 'rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonJS from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import vuePlugin from '@vitejs/plugin-vue';
import { babel } from '@rollup/plugin-babel';

const isDev = process.env.NODE_ENV === 'development';

const handleNormalRollupTask = async configList => {
    const waiters = configList.map(async config => {
        const bundle = await rollup(config);
        await Promise.all(config.output.map(bundle.write));
    });
    return Promise.all(waiters);
};
// rollup-plugin-typescript2换成@rollup/plugin-typescript的原因，其在watch模式下有问题
/*  rollup-plugin-typescript2 调用typescript的 DocumentRegistry时
会有缓存,导致vueSFC的解析的中间代码是旧代码。
https://github.com/ezolenko/rollup-plugin-typescript2/issues/433
 */
const handleWatchRollupTask = async configList => {
    // 监视模式下使用rollup内置watch方法
    configList.forEach(config => {
        config.watch = {
            clearScreen: false
        };
    });
    const emitter = rollupWatch(configList);
    return new Promise((_, reject) => {
        emitter.on('event', params => {
            if (params.result) {
                return params.result.close();
            }
            if (params.code == 'ERROR') {
                reject(params.error);
            }
        });
    });
};

export default class RollupTaskFactory {
    constructor(taskRunner) {
        this.helpers = taskRunner.helper;
        this.taskRunner = taskRunner;
    }
    createTask(config) {
        config = config || this.getRollupDefaultConifg();
        const { taskRunner } = this;
        return async function rollupTask() {
            try {
                if (taskRunner.isWatch) {
                    await handleWatchRollupTask(config);
                } else {
                    await handleNormalRollupTask(config);
                }
            } catch (e) {
                console.error(e.message);
                throw e;
            }
        };
    }
    getRollupDefaultConifg() {
        const inputPlugins = [
            resolvePlugin({
                browser: true
            }),
            commonJS(),
            vuePlugin(),
            json(),
            typescript(),
            // 对于组件的内部css使用inject的方式
            // TODO: style-inject安装在根，但是需要各个子模块的dependency加入
            // 后续需要优化下
            postcss({
                inject(cssVariableName) {
                    return `import styleInject from 'style-inject';\n styleInject(${cssVariableName})`;
                }
            }),
            babel({
                skipPreflightCheck: true,
                babelHelpers: 'runtime',
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }),
            alias({
                entries: this.helpers.getPathAlias()
            })
        ];
        if (!isDev) {
            inputPlugins.push(...[terser()]);
        }
        return [
            {
                plugins: inputPlugins,
                external: this.helpers.checkIsExternal.bind(this.helpers),
                input: this.helpers.resolve('./lib/index.ts'),
                output: [
                    {
                        format: 'es',
                        dir: this.helpers.getOutDir(),
                        preserveModules: true
                    }
                ]
            }
        ];
    }
    getInnerPlugins() {
        return {
            resolvePlugin,
            commonJS,
            vuePlugin,
            json,
            typescript,
            babel,
            alias
        };
    }
}
