import deleteTip from './deleteTip.vue';
import BaseTip from './BaseTip';
import { h } from 'vue';

export const DeleteTip: BaseTip = {
    tipName: 'deleteTips',
    tipIcon: 'material-symbols-light:delete-outline-rounded',
    hideComponent: ['pageContainer'],
    render(engin, treeNode) {
        return h(deleteTip, {
            engin,
            treeNode,
            tip: this
        });
    }
};
