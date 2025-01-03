import styleEditor from './styleEditor.vue';
import { type TreeNode, Engin, SetterConfig, BaseSetter } from '@lego/core';

export default class StyleEditorSetter extends BaseSetter {
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
                    prop: 'style',
                    applyer(instance) {
                        const oldGetter = instance.getter.bind(instance);
                        const oldSetter = instance.setter.bind(instance);
                        return {
                            getter() {
                                return `#main {${oldGetter() || ''}}`;
                            },
                            setter(value: string) {
                                const valueExp = /#main \{([^}]*)\}/;
                                const execResult = valueExp.exec(value);
                                value = execResult ? execResult[1] : '';
                                oldSetter(value);
                            }
                        };
                    }
                },
                setterConfig
            )
        );
        this.init();
    }
    init() {
        this.addView(styleEditor);
    }
}
