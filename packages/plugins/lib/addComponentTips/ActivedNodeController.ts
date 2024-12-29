import { TreeNode, FnType, Engin } from '@lego/core';
import { HoverNodeMessage } from './types';
import { getNodeLocked } from '../utils';

// hover和选中节点的处理器
export class ActivedNodeController {
    constructor(
        private handler: FnType,
        private getSelectedNodes: () => TreeNode[]
    ) {}

    handlerHoverNode(node?: TreeNode) {
        let hoverNode: HoverNodeMessage | null = null;
        if (node) {
            const { result, lockedNode } = getNodeLocked(node);
            if (result) {
                hoverNode = {
                    hoverNode: node,
                    locked: true,
                    lockedNode
                };
            } else {
                hoverNode = {
                    hoverNode: node
                };
            }
        }
        this.handler('treeNode-hover', hoverNode);
    }
    handlerSelectedNodes(selectedNodes: TreeNode[]) {
        const handleNodes = [...selectedNodes];
        return handleNodes.map(node => {
            const { result, lockedNode } = getNodeLocked(node);
            if (result) {
                node = lockedNode!;
            }
            return node;
        });
    }

    removeSelectedNode(nodes?: TreeNode[]) {
        const currentSelectedNode = [...this.getSelectedNodes()];
        const ids = currentSelectedNode.map(node => node.id);
        if (!nodes) {
            currentSelectedNode.length = 0;
        } else {
            nodes!.forEach(node => {
                let index;
                if ((index = ids.indexOf(node.id)) >= 0) {
                    currentSelectedNode.splice(index, 1);
                }
            });
        }
        return currentSelectedNode;
    }
}

export default {
    init(handler: FnType, getSelectedNodes: FnType, engin: Engin) {
        const controller = new ActivedNodeController(handler, getSelectedNodes);

        engin.hooks.treeNodeCreate.tap(node => {
            node.event.on('destroyedComponent', () => {
                const nodes = controller.removeSelectedNode([node]);
                handler('set-Selected-treeNode', nodes);
            });
        });
        engin.hooks.handlerSelectedNodes.tap(nodes => {
            return controller.handlerSelectedNodes(nodes);
        });
        return controller;
    }
};
