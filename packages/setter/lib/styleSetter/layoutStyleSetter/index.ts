import { type SetterMeterialMeta } from '@lego/core';
import layoutStyleSetter from './layoutStyle.vue';

const layoutStyleSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '布局样式',
    name: 'layoutStyle',
    setterName: 'layoutStyle',
    getMetrial() {
        return layoutStyleSetter;
    }
};

export default layoutStyleSetterMeterial;
export { layoutStyleSetterMeterial };
