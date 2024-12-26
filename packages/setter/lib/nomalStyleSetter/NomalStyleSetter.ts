import { SetterConfig } from '../types/setter';
import BaseSetter from '../BaseSetter';
import StyleEditorSetter from '../styleEditorSetter/StyleEditorSetter';

export default class NomalStyleSetter extends BaseSetter {
    constructor(public setterConfig: SetterConfig) {
        super(setterConfig);
        this.initChildren();
    }
    initChildren() {
        this.addChildren([
            new StyleEditorSetter({
                treeNode: this.setterConfig.treeNode
            })
        ]);
    }
}
