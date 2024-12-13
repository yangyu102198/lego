import gulpSass from 'gulp-sass';
import chokidar from 'chokidar';
import * as dartSass from 'sass';
import fs from 'fs-extra';
import { Helpers } from './Helpers.mjs';
import { src, dest } from 'gulp';

let helper = Helpers;

export const createSassTask = isWatch =>
    async function sassTask() {
        let rerun = false;
        let running = false;
        const run = async () => {
            if (running) {
                rerun = true;
                return;
            } else {
                running = true;
                await copyAndcompileSass();
                running = false;
                if (rerun) {
                    run();
                    rerun = false;
                }
            }
        };
        await run();
        if (isWatch) {
            // 监听lib/theme目录
            chokidar
                .watch(helper.resolve('./lib/theme'), {
                    awaitWriteFinish: true
                })
                .on('all', run);
        }
    };

export const copyAndcompileSass = async () => {
    const targetDir = helper.getOutDir();
    const sass = gulpSass(dartSass);
    //复制sass文件到dist/theme目录
    await fs.copy(helper.resolve('./lib/theme'), `${targetDir}/theme`);
    //解析sass文件
    await src(
        helper.resolve(`./lib/theme/!(vars|config|function|rootVars).scss`)
    )
        .pipe(sass())
        .pipe(dest(helper.resolve(`${targetDir}/theme/style`)));
};
