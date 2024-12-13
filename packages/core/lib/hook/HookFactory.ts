import { FnType } from '@type/utils';
import Hook from './Hook';
import {
    type HookMeta,
    type HookInstanceName,
    type ResolveHookInstanceNameToHookFunction
} from '@type/hook';

//替换Promise或者Array的值
type ReplacePromiseOrArray<T, R> =
    T extends Promise<infer U>
        ? Promise<ReplacePromiseOrArray<U, R>>
        : T extends Array<infer C>
          ? Array<ReplacePromiseOrArray<C, R>>
          : R;

//抽取对应hook方法的返回值，并替换
type GetHookFunctionRetrun<
    T,
    U extends HookInstanceName
> = ReplacePromiseOrArray<
    ReturnType<Hook[ResolveHookInstanceNameToHookFunction<U>]>,
    T
>;

export class SpecificHookBase<
    Params extends unknown[] = unknown[],
    U extends HookInstanceName = HookInstanceName,
    R = any
> {
    private hook: Hook<Params>;
    private applyName: ResolveHookInstanceNameToHookFunction<U>;
    constructor(public hookName: U) {
        this.hook = new Hook();
        this.applyName = this.hookName.slice(
            0,
            -4
        ) as ResolveHookInstanceNameToHookFunction<U>;
    }
    tap(arg: HookMeta<Params, R> | FnType<Params, R>) {
        if (typeof arg === 'function') {
            arg = {
                handler: arg
            };
        }
        return this.hook.tap(arg);
    }
    call<R>(...args: Params): GetHookFunctionRetrun<R, U> {
        return this.hook[this.applyName](...args) as any;
    }
}

/**
 * 对应Hook的指定方法的返回值
 * 指定Hook的工厂
 * HooKFactory('AsyncParallelHook')
 * @param hookName
 * @returns
 */
export const spcialHookFactory = <
    Params extends unknown[],
    U extends HookInstanceName,
    R = any
>(
    hookName: U
) => {
    return new SpecificHookBase<Params, U, R>(hookName);
};
