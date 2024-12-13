import { MeterialMeta } from './meterialMeta';
import { type HookInstanceName } from './hook';
import { type EnginConfig } from './enginConfig';
import type Engine from '../engine';
import TreeNode from '../nodeManager/TreeNode';
import { spcialHookFactory } from '../hook';
import { MakeAsync } from './utils';

// 插件的钩子的函数声明
export interface HooksInstanceFunction {
    // engin相关
    options(options: EnginConfig): void;
    pluginInited(engin: Engine);
    enginFlowStart(engin: Engine): boolean | void;
    inited(engin: Engine): void;
    enginFlowEnd(): void;
    // 资源相关
    meterialRegisterFinish(meterialList: MeterialMeta[]): void;
    // 节点相关
    selectedNode(nodes: TreeNode[]): void;
    rootNodeActived(node: TreeNode | null): void;
    treeNodeCreate(node: TreeNode): void;
    treeNodeDestory(node: TreeNode): void;
}
// 异步钩子
export type AsyncHooksInstance = 'options' | 'pluginInited' | 'enginFlowStart';
// 同步钩子
export type SyncHooksInstance =
    | 'meterialRegisterFinish'
    | 'inited'
    | 'enginFlowEnd'
    | 'rootNodeActived'
    | 'selectedNode'
    | 'treeNodeCreate'
    | 'treeNodeDestory';
// 所有插件的钩子
export type HooksInstance = AsyncHooksInstance | SyncHooksInstance;

export const HookMapHookInstance = {
    options: 'AsyncSeriesHook',
    meterialRegisterFinish: 'AsyncParallelHook',
    pluginInited: 'SyncHook',
    enginFlowStart: 'SyncFirstRetHook',
    inited: 'SyncHook',
    enginFlowEnd: 'SyncHook',
    rootNodeActived: 'SyncHook',
    selectedNode: 'SyncHook',
    treeNodeCreate: 'SyncHook',
    treeNodeDestory: 'SyncHook'
} as const satisfies Partial<Record<HooksInstance, HookInstanceName>>;

export type MakePluginHookFunction<T extends HooksInstance> =
    T extends AsyncHooksInstance
        ? MakeAsync<HooksInstanceFunction[T]>
        : HooksInstanceFunction[T];

export type HooksInstanceDriver = {
    [P in HooksInstance]: ReturnType<
        typeof spcialHookFactory<
            Parameters<HooksInstanceFunction[P]>,
            (typeof HookMapHookInstance)[P],
            ReturnType<MakePluginHookFunction<P>>
        >
    >;
};
