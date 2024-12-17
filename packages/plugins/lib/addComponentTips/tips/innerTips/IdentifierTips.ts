import identifierTips from './identifierTips.vue';
import BaseTips from './BaseTIps';
import { h } from 'vue';

export const IdentifierTips: BaseTips = {
    tipsName: 'identifierTips',
    hideComponent: [],
    render(engin, treeNode, activedNodeController) {
        return h(identifierTips, {
            engin,
            treeNode,
            activedNodeController
        });
    }
};
