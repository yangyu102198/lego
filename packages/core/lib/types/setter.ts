import TreeNode from '../nodeManager/TreeNode';
import Engin from '../engine';
import { Component } from 'vue';
import { FnType } from './utils';

export interface Applyer {
    getter(...arg: unknown[]): any;
    setter(...arg: unknown[]): any;
    prop: string;
    treeNode: TreeNode;
    engin: Engin;
}

export type ApplerExtend = Partial<Pick<Applyer, 'getter' | 'setter'>>;
export type ApplerParams = Pick<Applyer, 'engin' | 'prop' | 'treeNode'>;

export interface SetterConfig {
    config?: Record<string, any> | FnType;
    applyer?: Partial<Applyer> | FnType;
    prop?: string;
    setter?: string | Component;
    children?: SetterConfig[];
}
