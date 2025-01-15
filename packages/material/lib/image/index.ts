import { type ComponentMeterialMeta } from '@lego/core';
import imageComponent from './image.vue';
import componentEditPanelConfig from './componentEditPanelConfig';
import { getProps } from './props';

const imageMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '图片',
    name: 'image',
    componentName: 'image',
    componentIcon: 'material-symbols-light:text-compare-outline-rounded',
    componentEditPanel: componentEditPanelConfig,
    componentConfig: {
        props: getProps(),
        publicEvent: ['onclick']
    },
    getMetrial() {
        return imageComponent;
    }
};

export default imageMeterial;
export { imageComponent };
