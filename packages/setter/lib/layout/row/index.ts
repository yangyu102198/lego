import { type SetterMeterialMeta } from '@lego/core';
import row from './row.vue';

const layoutRowSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: 'row',
    name: 'layout-row',
    setterName: 'layout-row',
    setterConfig: {
        layout: true
    },
    getMetrial() {
        return row;
    }
};

export default layoutRowSetterMeterial;
export { layoutRowSetterMeterial };
