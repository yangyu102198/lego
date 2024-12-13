// hook的配置类型，使用tap(hookMeta)
export interface HookMeta<T extends unknown[] = unknown[], R = any> {
    priority?: number | 'pre' | 'post';
    name?: string;
    handler(...arg: T): R;
}
// 钩子方法名
export type HookFunction =
    | 'AsyncParallel'
    | 'AsyncSeries'
    | 'AsyncSeriesWater'
    | 'AsyncSeriesFirstRet'
    | 'SyncFirstRet'
    | 'Sync'
    | 'SyncFirstRet'
    | 'SyncWater';

// 通过钩子方法名生成的钩子实例名
export type ResolveHookFunctionToHookInsctanceName<T extends HookFunction> =
    T extends T ? `${T}Hook` : T;

// 通过钩子实例名还原钩子方法名
export type ResolveHookInstanceNameToHookFunction<T extends HookInstanceName> =
    T extends `${infer C}Hook` ? C : T;

// 钩子的实例名
export type HookInstanceName =
    ResolveHookFunctionToHookInsctanceName<HookFunction>;
