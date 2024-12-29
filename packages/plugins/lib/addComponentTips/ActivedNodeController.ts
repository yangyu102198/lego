import { TreeNode, FnType, Engin } from '@lego/core';
import { HoverNodeMessage } from './types';
import { getNodeLocked } from '../utils';
import Dispatcher from './Dispatcher';
// hover和选中节点的处理器
export class ActivedNodeController {
    constructor(private dispatcher: Dispatcher) {}

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
        this.dispatcher.dispatchControllerEvent('treeNode-hover', hoverNode);
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
        const currentSelectedNode = [...this.dispatcher.getSelectedNode()];
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

const __handlerList: FnType[] = [];

const ActivedNodeControllerManager = {
    init(dispatcher: Dispatcher, engin: Engin) {
        const controller = new ActivedNodeController(dispatcher);

        const removeCreateEvent = engin.hooks.treeNodeCreate.tap(node => {
            node.event.on('destroyedComponent', () => {
                const nodes = controller.removeSelectedNode([node]);
                dispatcher.dispatchControllerEvent(
                    'set-Selected-treeNode',
                    nodes
                );
            });
        });
        const removeSelectedEvent = engin.hooks.handlerSelectedNodes.tap(
            nodes => {
                return controller.handlerSelectedNodes(nodes);
            }
        );
        __handlerList.push(() => {
            removeCreateEvent();
            removeSelectedEvent();
        });
        return controller;
    },
    destroyed() {
        let fn: FnType | undefined;
        while ((fn = __handlerList.shift())) {
            fn();
        }
    }
};

export default ActivedNodeControllerManager;
