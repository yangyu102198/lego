import { type SetterMeterialMeta } from '@lego/core';
import fontStyleSetter from './fontStyle.vue';

const fontStyleSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '布局样式',
    name: 'fontStyle',
    setterName: 'fontStyle',
    getMetrial() {
        return fontStyleSetter;
    }
};

export default fontStyleSetterMeterial;
export { fontStyleSetterMeterial };
