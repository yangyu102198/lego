import { type ComponentMeterialMeta, ComponentLayoutName } from '@lego/core';
import pageContainer from './pageContainer.vue';
const pageContainerMeterial: ComponentMeterialMeta<ComponentLayoutName.Page> = {
    version: 'v0.1.1',
    type: 'component',
    alias: '页面容器',
    name: 'pageContainer',
    componentName: 'pageContainer',
    componentLayoutType: ComponentLayoutName.Page,
    componentEditConfig: {
        showInNav: false,
        drag: false
    },
    getMetrial() {
        return pageContainer;
    }
};
export default pageContainerMeterial;
