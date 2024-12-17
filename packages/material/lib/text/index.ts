import { type ComponentMeterialMeta } from '@lego/core';
import text from './text.vue';

const textMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '文本',
    name: 'text',
    componentName: 'text',
    componentIcon: 'material-symbols-light:text-compare-outline-rounded',
    getMetrial() {
        return text;
    }
};

export default textMeterial;
export { text };
