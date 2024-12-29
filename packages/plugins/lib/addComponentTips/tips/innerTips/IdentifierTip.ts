import identifierTip from './identifierTip.vue';
import BaseTip from './BaseTip';
import { h } from 'vue';

export const IdentifierTip: BaseTip = {
    tipName: 'identifierTips',
    hideComponent: [],
    render(engin, treeNode) {
        return h(identifierTip, {
            engin,
            treeNode
        });
    }
};
