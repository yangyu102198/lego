import { TreeNode, Engin } from '@lego/core';

export default interface BaseTips {
    tipsName: string;
    showComponent?: string[];
    hideComponent?: string[];
    show?(node: TreeNode): boolean;
    render(engin: Engin, treeNode: TreeNode): unknown;
}
