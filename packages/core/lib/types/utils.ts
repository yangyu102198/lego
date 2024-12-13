export type NullValue = null | undefined | void;
/**
 * 联合类型增加数组类型
 */
export type MaybeArray<T> = T | T[];
/**
 * 联合类型增加Promise类型
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * 异步函数
 */
export type MakeAsync<_Function> = _Function extends (
    ...args: infer Argument
) => infer Return
    ? (...args: Argument) => Return | Promise<Return>
    : never;

/**
 * 一般函数类型
 */
export type FnType<T extends any[] = any[], U = any> = (...args: T) => U;

/**
 * 把部分参数变为可选参数
 */
export type ToPartial<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

export type IncludeTo<T, V> = {
    [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];
