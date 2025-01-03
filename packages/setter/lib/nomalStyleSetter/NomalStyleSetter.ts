import { type TreeNode, Engin, BaseSetter, SetterConfig } from '@lego/core';
import StyleEditorSetter from '../styleEditorSetter/StyleEditorSetter';
import nomalStyle from './nomalStyle.vue';

export default class NomalStyleSetter extends BaseSetter {
    constructor(
        public engin: Engin,
        public treeNode: TreeNode,
        public setterConfig: SetterConfig
    ) {
        super(engin, treeNode, setterConfig);
        this.init();
    }
    init() {
        this.addChildren([
            new StyleEditorSetter(this.engin, this.treeNode, {})
        ]);
        this.addView(nomalStyle);
    }
}
