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
    handlerSelectedNodes(node: TreeNode, isClear = true) {
        const { result, lockedNode } = getNodeLocked(node);
        const currentSelectedNode = [...this.getSelectedNodes()];
        if (result) {
            node = lockedNode!;
        }
        if (isClear) {
            currentSelectedNode.length = 0;
        }
        currentSelectedNode.push(node);
        this.handlerSelectedChanged(currentSelectedNode);
    }
    private diffSelectedNodes(nodes: TreeNode[]) {
        const oldSelectedNodesIds = this.getSelectedNodes().map(
            treeNode => treeNode.id
        );
        const newSelectedNodeIds = nodes.map(treeNode => treeNode.id);
        const oldIdSet = new Set(oldSelectedNodesIds);
        const newIdSet = new Set(newSelectedNodeIds);
        const mergeIdSet = new Set([
            ...oldSelectedNodesIds,
            ...newSelectedNodeIds
        ]);
        if (
            oldIdSet.size == newIdSet.size &&
            oldIdSet.size == mergeIdSet.size
        ) {
            return true;
        }
    }
    removeSelectedNode(nodes?: TreeNode[]) {
        const currentSelectedNode = this.getSelectedNodes();
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
        this.handlerSelectedChanged(currentSelectedNode);
    }

    private handlerSelectedChanged(currentSelectedNode: TreeNode[]) {
        if (!this.diffSelectedNodes(currentSelectedNode))
            this.handler('treeNode-actived', currentSelectedNode);
    }
}

export default {
    init(handler: FnType, getSelectedNodes: FnType, engin: Engin) {
        const controller = new ActivedNodeController(handler, getSelectedNodes);

        engin.hooks.treeNodeCreate.tap(node => {
            node.event.on('destroyedComponent', () => {
                controller.removeSelectedNode([node]);
            });
        });
        engin.eventBus.on('handlerSelectedNodes', nodes => {
            controller.handlerSelectedNodes(nodes);
        });
        return controller;
    }
};
