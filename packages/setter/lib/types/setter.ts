import { type TreeNode } from '@lego/core';

export interface Setter {
    render(...arg: unknown[]): unknown;
    appler?: Applyer;
    children: Setter[];
}

export interface Applyer {
    getter(...arg: unknown[]): unknown;
    setter(...arg: unknown[]): unknown;
    key: string;
    treeNode: TreeNode;
}

export interface SetterConfig {
    config?: Record<string, any>;
    applyer?: Partial<Applyer>;
    applyerConfig?: Partial<ApplyerConfig>;
    treeNode: TreeNode;
    key?: string;
}

export interface ApplyerConfig {
    config?: Record<string, any>;
    treeNode: TreeNode;
    key?: string;
}
