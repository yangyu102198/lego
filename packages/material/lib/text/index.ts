import { type ComponentMeterialMeta } from '@lego/core';
import textComponent from './text.vue';

const textMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '文本',
    name: 'text',
    componentName: 'text',
    componentIcon: 'material-symbols-light:text-compare-outline-rounded',
    componentEditPanel: [
        {
            tab: '属性',
            setters: [
                {
                    setter: 'checkbox',
                    propsName: 'props.sign',
                    label: '标记',
                    setterConfig: {}
                }
            ]
        },
        {
            tab: '样式',
            setters: [
                {
                    propsName: 'style',
                    setter: 'normal-style'
                }
            ]
        }
    ],
    componentConfig: {
        publicEvent: ['onclick']
    },
    getMetrial() {
        return textComponent;
    }
};

export default textMeterial;
export { textComponent };
