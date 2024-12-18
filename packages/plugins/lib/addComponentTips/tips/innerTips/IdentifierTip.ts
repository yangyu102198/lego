import identifierTip from './identifierTip.vue';
import BaseTip from './BaseTip';
import { h } from 'vue';

export const IdentifierTip: BaseTip = {
    tipName: 'identifierTips',
    hideComponent: [],
    render(engin, treeNode, activedNodeController) {
        return h(identifierTip, {
            engin,
            treeNode,
            activedNodeController
        });
    }
};
