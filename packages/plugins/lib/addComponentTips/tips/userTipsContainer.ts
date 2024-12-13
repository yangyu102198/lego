import { Engin, TreeNode } from '@lego/core';
import { reactive } from 'vue';
import {
    HoverNodeMessage,
    HoverNodeShowMessage,
    SelectedNodeShowMessage
} from '../types';
import { getDomElementPosition, immediate } from '../../utils';

const calcNodeRelativeRoot = (node, rootTreeNode) => {
    const rootTreeNodePostion = getDomElementPosition(
        rootTreeNode.component.$el as HTMLElement
    );
    const nodePostion = getDomElementPosition(
        node.component.$el as HTMLElement
    );

    return {
        left: nodePostion.left - rootTreeNodePostion.left,
        top: nodePostion.top - rootTreeNodePostion.top,
        width: nodePostion.width,
        height: nodePostion.height
    };
};

export default (engin: Engin, rootTreeNode: TreeNode) => {
    const RD = reactive<{
        hoverNodeMessage: null | HoverNodeShowMessage;
        activedNodeMessage: SelectedNodeShowMessage[];
    }>({
        hoverNodeMessage: null,
        activedNodeMessage: []
    });
    const removeHoverEvent = engin.eventBus.on(
        'treeNode-hover',
        (hoverNodeMessage: HoverNodeMessage | null) => {
            if (!hoverNodeMessage) {
                RD.hoverNodeMessage = null;
                return;
            }
            const message: HoverNodeShowMessage = {} as any;
            let hoverNode = hoverNodeMessage.hoverNode;
            if (hoverNodeMessage.locked) {
                message.locked = true;
                hoverNode = hoverNodeMessage.lockedNode!;
            }

            message.position = calcNodeRelativeRoot(hoverNode, rootTreeNode);
            message.message =
                hoverNodeMessage.hoverNode.configApplier.getDefaultConfig(
                    'alias'
                );
            RD.hoverNodeMessage = message;
        }
    );
    const handlerSelectedNode = nodes => {
        const message: SelectedNodeShowMessage[] = [];
        if (!nodes.length && !RD.activedNodeMessage.length) {
            return;
        }
        nodes.forEach(node => {
            message.push({
                position: calcNodeRelativeRoot(node, rootTreeNode),
                selectedNode: node
            });
        });
        RD.activedNodeMessage = message;
    };

    const freshSelectedNode = () => {
        const currentActived = RD.activedNodeMessage.map(
            item => item.selectedNode
        );
        immediate(() => handlerSelectedNode(currentActived));
    };
    // 当节点被选中时触发
    const removeSelected = engin.hooks.selectedNode.tap(handlerSelectedNode);
    // 当选中节点尺寸变化时触发
    const removeResize = engin.eventBus.on(
        'treeNode-actived-resize',
        freshSelectedNode
    );
    // 当节点的拖动导致位置等变化时触发
    const removeDrop = engin.eventBus.on('region-drop', freshSelectedNode);
    return {
        getHoverNodeMessage() {
            return RD.hoverNodeMessage;
        },
        getActivedNodeMessage() {
            return RD.activedNodeMessage as SelectedNodeShowMessage[];
        },
        unbind() {
            removeHoverEvent();
            removeSelected();
            removeResize();
            removeDrop();
        }
    };
};
