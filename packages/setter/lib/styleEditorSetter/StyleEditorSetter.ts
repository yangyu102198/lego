import { SetterConfig } from '../types/setter';
import styleEditor from './styleEditor.vue';
import BaseSetter from '../BaseSetter';

export default class StyleEditorSetter extends BaseSetter {
    constructor(public setterConfig: SetterConfig) {
        super(
            Object.assign({
                key: 'componentConfig.style'
            })
        );
        this.init();
    }
    init() {
        this.addView(styleEditor);
    }
}
