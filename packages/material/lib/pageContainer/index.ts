import { type ComponentMeterialMeta, ComponentLayoutName } from '@lego/core';
import pageContainerComponent from './pageContainer.vue';
const pageContainerMeterial: ComponentMeterialMeta<ComponentLayoutName.Page> = {
    version: 'v0.1.1',
    type: 'component',
    alias: '页面容器',
    name: 'pageContainer',
    componentName: 'pageContainer',
    componentLayoutType: ComponentLayoutName.Page,
    componentIcon: 'material-symbols-light:two-pager-rounded',
    componentEditConfig: {
        showInNav: false,
        drag: false
    },
    getMetrial() {
        return pageContainerComponent;
    }
};
export default pageContainerMeterial;
export { pageContainerComponent };
