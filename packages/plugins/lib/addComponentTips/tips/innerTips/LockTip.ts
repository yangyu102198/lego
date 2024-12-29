import lockTip from './lockTip.vue';
import BaseTip from './BaseTip';
import { h } from 'vue';
import { ComponentLayoutName } from '@lego/core';

export const LockTip: BaseTip = {
    tipName: 'copyTip',
    show(node) {
        const layoutType = node.configApplier.getDefaultConfig(
            'componentLayoutType'
        );
        // 锁定的tip: 当不是原子和页面节点的时候显示
        if (
            layoutType &&
            layoutType !== ComponentLayoutName.Atom &&
            layoutType !== ComponentLayoutName.Page
        ) {
            return true;
        } else {
            return false;
        }
    },
    render(engin, treeNode) {
        return h(lockTip, {
            engin,
            treeNode,
            tip: this
        });
    }
};
