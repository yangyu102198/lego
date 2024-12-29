import { Engin, TreeNode } from '@lego/core';
import { ActivedNodeController } from './ActivedNodeController';
import { HoverNodeMessage } from './types';

export const dispatchComponentEvent =
    (engin: Engin, controller: ActivedNodeController) =>
    (eventName: string, event: Event, node: TreeNode) => {
        event.stopPropagation();
        switch (eventName) {
            case 'mouseover':
                controller.handlerHoverNode(node);
                break;
            case 'mouseout':
                controller.handlerHoverNode();
                break;
            case 'click':
                engin.treeNodeManager.setSelectedNode(node);
                break;
        }
    };

//TODU: treeNode-hover 和actived分别用了两种不同方式
export const dispatchControllerEvent =
    (engin: Engin) => (event: string, data: any) => {
        switch (event) {
            case 'treeNode-hover':
                engin.eventBus.emit(
                    'treeNode-hover',
                    data as HoverNodeMessage | null
                );
                break;
            case 'set-Selected-treeNode':
                engin.treeNodeManager.setSelectedNode(data);
                break;
            case 'treeNode-actived-resize':
                engin.eventBus.emit('treeNode-actived-resize', data);
                break;
        }
    };
