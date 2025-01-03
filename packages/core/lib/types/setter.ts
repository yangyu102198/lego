import TreeNode from '../nodeManager/TreeNode';
import Engin from '../engine';
import BaseSetter from '../setter/BaseSetter';

export interface Applyer {
    getter(...arg: unknown[]): unknown;
    setter(...arg: unknown[]): unknown;
    prop: string;
    treeNode: TreeNode;
    engin: Engin;
}

export type ApplerExtend = Partial<Pick<Applyer, 'getter' | 'setter'>>;
export type ApplerParams = Pick<Applyer, 'engin' | 'prop' | 'treeNode'>;
export type BaseSetterCtr = {
    new (...arg: ConstructorParameters<typeof BaseSetter>): BaseSetter;
};

export interface SetterConfig {
    config?: Record<string, any>;
    applyer?: Partial<Applyer>;
    prop?: string;
    setter?: string | BaseSetterCtr;
    children?: SetterConfig[];
}
