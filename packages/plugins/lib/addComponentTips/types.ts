import { TreeNode } from '@lego/core';

export type HoverNodeMessage = {
    hoverNode: TreeNode;
    locked?: boolean;
    lockedNode?: TreeNode;
};

export type HoverNodeShowMessage = {
    locked?: boolean;
    position: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    message: string;
};

export type SelectedNodeShowMessage = {
    position: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    selectedNode: TreeNode;
};

export type TreeObserver = {
    treeNode: TreeNode;
    el: HTMLElement;
    first: boolean;
    id: string;
};
