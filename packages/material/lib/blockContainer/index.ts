import { type ComponentMeterialMeta, ComponentLayoutName } from '@lego/core';
import blockContainerComponent from './blockContainer.vue';
import './style/index';

const blockContainerMeterial: ComponentMeterialMeta<ComponentLayoutName.Block> =
    {
        version: 'v0.1.1',
        type: 'component',
        alias: '块容器',
        name: 'blockContainer',
        componentName: 'blockContainer',
        componentIcon: 'material-symbols-light:content-copy-outline-sharp',
        componentLayoutType: ComponentLayoutName.Block,
        getMetrial() {
            return blockContainerComponent;
        }
    };

export default blockContainerMeterial;
export { blockContainerComponent };
