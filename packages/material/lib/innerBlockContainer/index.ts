import { type ComponentMeterialMeta } from '@lego/core';
import innerBlockContainerComponent from './innerBlockContainer.vue';

const innerBlockContainerMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '组件容器',
    name: 'innerBlock',
    componentName: 'innerBlockTest',
    getMetrial() {
        return innerBlockContainerComponent;
    }
};

export default innerBlockContainerMeterial;
export { innerBlockContainerComponent };
