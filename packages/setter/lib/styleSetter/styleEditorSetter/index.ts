import { type SetterMeterialMeta } from '@lego/core';
import styleEditorSetter from './styleEditorWrap.vue';

const styleEditorSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '样式编辑',
    name: 'style-editor',
    setterName: 'style-editor',
    getMetrial() {
        return styleEditorSetter;
    }
};

export default styleEditorSetterMeterial;
export { styleEditorSetter };
