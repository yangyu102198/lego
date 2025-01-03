import { Engin, TreeNode } from '@lego/core';
import { HoverNodeMessage } from './types';

export default class Dispatcher {
    constructor(public engin: Engin) {}
    getSelectedNode(): TreeNode[] {
        return [...this.engin.treeNodeManager.selectedNode];
    }
    // 发送组件绑定的事件
    dispatchComponentEvent(eventName: string, event: Event, node: TreeNode) {
        event.stopPropagation();
        switch (eventName) {
            case 'mouseover':
                this.engin.eventBus.emit('set-treeNode-hover', node);
                break;
            case 'mouseout':
                this.engin.eventBus.emit('set-treeNode-hover', null);
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
