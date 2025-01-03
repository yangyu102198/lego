import { type ComponentMeterialMeta } from '@lego/core';
import textComponent from './text.vue';
import componentEditPanelConfig from './componentEditPanelConfig';
const textMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '文本',
    name: 'text',
    componentName: 'text',
    componentIcon: 'material-symbols-light:text-compare-outline-rounded',
    componentEditPanel: componentEditPanelConfig,
    componentConfig: {
        publicEvent: ['onclick']
    },
    getMetrial() {
        return textComponent;
    }
};

export default textMeterial;
export { textComponent };
