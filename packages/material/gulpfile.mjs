import { TaskRunner, compositeTasks } from '../../build/gulpfile.mjs';

const taskRunner = new TaskRunner();

export const compile = () => taskRunner.runTask(compositeTasks);

export const watchCompile = () => taskRunner.runTask(compositeTasks, true);
