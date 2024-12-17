import copyTips from './copyTips.vue';
import BaseTips from './BaseTIps';
import { h } from 'vue';

export const CopyTips: BaseTips = {
    tipsName: 'copyTips',
    hideComponent: ['pageContainer'],
    render(engin, treeNode) {
        return h(copyTips, {
            engin,
            treeNode
        });
    }
};
