import { Engin, TreeNode } from '@lego/core';
import { ActivedNodeController } from './ActivedNodeController';
import { HoverNodeMessage } from './types';

export default class Dispatcher {
    controller!: ActivedNodeController;
    constructor(public engin: Engin) {}
    setController(controller: ActivedNodeController) {
        this.controller = controller;
    }
    getSelectedNode(): TreeNode[] {
        return [...this.engin.treeNodeManager.selectedNode];
    }
    // 发送组件绑定的事件
    dispatchComponentEvent(eventName: string, event: Event, node: TreeNode) {
        event.stopPropagation();
        switch (eventName) {
            case 'mouseover':
                this.controller.handlerHoverNode(node);
                break;
            case 'mouseout':
                this.controller.handlerHoverNode();
                break;
            case 'click':
                this.engin.treeNodeManager.setSelectedNode(node);
                break;
        }
    }
    dispatchControllerEvent(event: string, data: any) {
        switch (event) {
            case 'treeNode-hover':
                this.engin.eventBus.emit(
                    'treeNode-hover',
                    data as HoverNodeMessage | null
                );
                break;
            case 'set-Selected-treeNode':
                this.engin.treeNodeManager.setSelectedNode(data);
                break;
            case 'treeNode-actived-resize':
                this.engin.eventBus.emit('treeNode-actived-resize', data);
                break;
        }
    }
}
