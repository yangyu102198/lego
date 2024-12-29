import { TreeNode, Engin } from '@lego/core';
export default interface BaseTip {
    tipName: string;
    tipIcon?: string;
    showComponent?: string[];
    hideComponent?: string[];
    show?(node: TreeNode): boolean;
    render(engin: Engin, treeNode: TreeNode): unknown;
}
