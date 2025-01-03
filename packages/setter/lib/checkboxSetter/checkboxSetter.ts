import { type TreeNode, Engin, BaseSetter, SetterConfig } from '@lego/core';
import checkboxView from './checkboxView.vue';

export default class NomalStyleSetter extends BaseSetter {
    constructor(
        public engin: Engin,
        public treeNode: TreeNode,
        public setterConfig: SetterConfig
    ) {
        super(
            engin,
            treeNode,
            Object.assign(
                {
                    size: 'large'
                },
                setterConfig
            )
        );
        this.init();
    }
    init() {
        this.addView(checkboxView);
    }
}
