import { type SetterMeterialMeta } from '@lego/core';
import col from './col.vue';

const layoutColSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: 'col',
    name: 'layout-col',
    setterName: 'layout-col',
    setterConfig: {
        layout: true
    },
    getMetrial() {
        return col;
    }
};

export default layoutColSetterMeterial;
export { layoutColSetterMeterial };
