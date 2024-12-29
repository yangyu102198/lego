import { type HookMeta } from '@type/hook';
import { FnType } from '@type/utils';

// type ExcludeLastParameter<T> = T extends [...infer U, unknown] ? U : never;
// type ExcludeLastParameter<T> = T extends [unknown, ...infer U] ? U : never;

type MaybeVoid<T> = T | void;
type MaybeUnfined<T> = T | undefined;

const DEFAULT_PRIORITY = 1000;

class Hook<Params extends unknown[] = unknown[]> {
    private hooksContainer: Array<HookMeta<Params>[]> = [[], [], []];
    //异步并发执行
    async AsyncParallel<T>(...args: Params): Promise<T[]> {
        const promisees: Promise<T>[] = [];
        for (const hook of this.getHooks()) {
            const wait = Promise.resolve().then(() => {
                return hook.handler.apply(null, args);
            });
            promisees.push(wait);
        }

        return await Promise.all(promisees);
    }
    // 异步顺序执行
    async AsyncSeries<T>(...args: Params): Promise<MaybeVoid<T>> {
        let result: MaybeUnfined<T>;
        for (const hook of this.getHooks()) {
            result = await this.runAsync(
                () => hook.handler.apply(null, args),
                hook
            );
        }
        return result;
    }
    // 异步顺序执行，下一个hook执行器会带上一个执行器的返回值
    async AsyncSeriesWater(...args: Params) {
        let first = args.shift();
        for (const hook of this.getHooks()) {
            const extendedArgs = [first, ...args] as Params;
            const result = await this.runAsync(
                () => hook.handler(...extendedArgs),
                hook
            );
            if (result) {
                first = result;
            }
        }
        return first;
    }
    // 异步顺序运行，当第一个hook有返回值时终止
    async AsyncSeriesFirstRet<T>(...args: Params): Promise<MaybeVoid<T>> {
        for (const hook of this.getHooks()) {
            const result: T = await this.runAsync(
                () => hook.handler.apply(null, args),
                hook
            );
            if (result !== null) {
                return result;
            }
        }
    }
    // 同步执行
    Sync<T>(...args: Params): MaybeVoid<T> {
        let result: MaybeUnfined<T>;
        for (const hook of this.getHooks()) {
            result = this.runSync(() => hook.handler.apply(null, args), hook);
        }
        return result;
    }
    // 同步顺序运行，当第一个hook有返回值时终止
    SyncFirstRet<T>(...args: Params): MaybeVoid<T> {
        let result: MaybeUnfined<T>;
        for (const hook of this.getHooks()) {
            result = this.runSync(() => hook.handler.apply(null, args), hook);
            if (result != null) {
                return result;
            }
        }
    }
    // 同步顺序执行，下一个hook执行器会带上一个执行器的返回值
    SyncWater(...args: Params) {
        let first = args.shift();
        for (const hook of this.getHooks()) {
            const extendedArgs = [first, ...args] as Params;

            const result = this.runSync(
                () => hook.handler.apply(null, extendedArgs),
                hook
            );
            if (result) {
                first = result;
            }
        }
        return first;
    }
    tap(hander: HookMeta<Params>) {
        if (!hander.priority) {
            hander.priority = DEFAULT_PRIORITY;
        }

        this.insertAndSort(hander);
        return () => {
            this.hooksContainer.some(container => {
                let index;
                if ((index = container.indexOf(hander)) > -1) {
                    container.splice(index, 1);
                    return true;
                }
            });
        };
    }

    private runAsync(hander: FnType, runHookMeta: HookMeta<Params>) {
        return Promise.resolve()
            .then(() => {
                return hander();
            })
            .catch(e => {
                const hookError = this.wrapError(e, runHookMeta);
                throw hookError;
            });
    }
    private runSync(hander: FnType, runHookMeta: HookMeta<Params>) {
        try {
            return hander();
        } catch (e) {
            const hookError = this.wrapError(e, runHookMeta);
            throw hookError;
        }
    }
    // 错误处理
    private wrapError(e, errorHookMeta: HookMeta<Params>): Error {
        if (typeof e == 'string') {
            e = { message: e };
        }
        if (!(e instanceof Error)) {
            e = Object.assign(new Error(), e);
        }
        if (errorHookMeta.name) {
            e.message += `\n(in hook ${errorHookMeta.name})`;
        }
        return e;
    }
    private insertAndSort(hook: HookMeta<Params>) {
        const { priority } = hook;
        const isPre = priority == 'pre';
        const isPost = priority == 'post';

        let insertList: HookMeta<Params>[];

        if (isPre || isPost) {
            // 根据 pre 和 post 的优先级直接插入对应的列表
            insertList = isPre
                ? this.hooksContainer[0]
                : this.hooksContainer[2];
            insertList.push(hook);
        } else {
            insertList = this.hooksContainer[1];
            let i = insertList.length - 1;

            for (; i >= 0; i--) {
                if ((insertList[i].priority as number) >= priority!) {
                    break;
                }
            }

            insertList.splice(i + 1, 0, hook);
        }
    }
    private getHooks() {
        // 合并三个优先级的 hooks 列表
        return [
            ...this.hooksContainer[0],
            ...this.hooksContainer[1],
            ...this.hooksContainer[2]
        ];
    }
}
export default Hook;
