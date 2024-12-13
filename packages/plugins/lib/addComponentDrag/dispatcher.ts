import { Engin, TreeNode } from '@lego/core';

export const createLayoutEventLinkerHandler = (
    engin: Engin,
    node: TreeNode
) => {
    return (singal: string, palyload: Record<string, any> = {}) => {
        const { data } = palyload;
        const emitData = {
            node,
            data
        };
        switch (singal) {
            case 'region-over':
                engin.eventBus.emit('region-over', emitData);
                break;
            case 'region-leaver':
                engin.eventBus.emit('region-leaver', emitData);
                break;
            case 'region-accept':
                engin.eventBus.emit('region-accept', emitData);
                break;
            case 'region-drop':
                engin.eventBus.emit('region-drop', emitData);
                engin.treeNodeManager.moveNodeTo(
                    data.anchorNodeId,
                    data.insertPostion,
                    data.targetNodeId
                );
                break;
        }
    };
};
