import copyTip from './copyTip.vue';
import BaseTip from './BaseTip';
import { h } from 'vue';

export const CopyTip: BaseTip = {
    tipName: 'copyTip',
    tipIcon: 'material-symbols-light:copy-all-outline',
    hideComponent: ['pageContainer'],
    render(engin, treeNode) {
        return h(copyTip, {
            engin,
            treeNode,
            tip: this
        });
    }
};
