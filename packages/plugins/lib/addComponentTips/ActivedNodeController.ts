import { TreeNode, FnType, Engin } from '@lego/core';
import { HoverNodeMessage } from './types';

// hover和选中节点的处理器
export class ActivedNodeController {
    constructor(
        private handler: FnType,
        private getSelectedNodes: () => TreeNode[]
    ) {}

    handlerHoverNode(node?: TreeNode) {
        let hoverNode: HoverNodeMessage | null = null;
        if (node) {
            const lockedMessage = this.checkAncestorNodeIsLocked(node);
            if (lockedMessage) {
                hoverNode = {
                    hoverNode: node,
                    locked: true,
                    lockedNode: lockedMessage.lockedNode
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
        const lockedMessage = this.checkAncestorNodeIsLocked(node);
        const currentSelectedNode = this.getSelectedNodes();
        if (lockedMessage) {
            node = lockedMessage.lockedNode;
        }
        if (isClear) {
            currentSelectedNode.length = 0;
        }
        currentSelectedNode.push(node);
        this.handlerSelectedChanged(currentSelectedNode);
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
        this.handler('treeNode-actived', currentSelectedNode);
    }

    private checkAncestorNodeIsLocked(node: TreeNode) {
        while (node.parentNode) {
            const parentNode = node.parentNode;
            if (
                parentNode.configApplier.getCurrentConfig(
                    'componentEditConfig.locked'
                )
            ) {
                return {
                    lockedNode: parentNode
                };
            }
            node = parentNode;
        }
        return false;
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
        return controller;
    }
};