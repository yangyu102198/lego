import { TreeNode, Engin } from '@lego/core';
import { ActivedNodeController } from '../../ActivedNodeController';
export default interface BaseTip {
    tipName: string;
    tipIcon?: string;
    showComponent?: string[];
    hideComponent?: string[];
    show?(node: TreeNode): boolean;
    render(
        engin: Engin,
        treeNode: TreeNode,
        activedNodeController: ActivedNodeController
    ): unknown;
}
