import { TreeNode, Engin } from '@lego/core';
import { ActivedNodeController } from '../../ActivedNodeController';
export default interface BaseTips {
    tipsName: string;
    showComponent?: string[];
    hideComponent?: string[];
    show?(node: TreeNode): boolean;
    render(
        engin: Engin,
        treeNode: TreeNode,
        activedNodeController: ActivedNodeController
    ): unknown;
}
