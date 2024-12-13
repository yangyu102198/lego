import { type ComponentMeterialMeta } from '@lego/core';
import test from './test.vue';

const testMeterial: ComponentMeterialMeta = {
    version: 'v0.1.1',
    type: 'component',
    alias: '测试组件',
    name: 'test',
    componentName: 'test',
    getMetrial() {
        return test;
    }
};

export default testMeterial;
export { test };
