import deleteTips from './deleteTips.vue';
import BaseTips from './BaseTIps';
import { h } from 'vue';

export const DeleteTips: BaseTips = {
    tipsName: 'deleteTips',
    hideComponent: ['pageContainer'],
    render(engin, treeNode) {
        return h(deleteTips, {
            engin,
            treeNode
        });
    }
};
