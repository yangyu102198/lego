import { type ComponentMeterialMeta } from '@lego/core';
import test from './test.vue';

const testMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '测试组件容器',
    name: 'innerBlockTest',
    componentName: 'innerBlockTest',
    getMetrial() {
        return test;
    }
};

export default testMeterial;
export { test };
