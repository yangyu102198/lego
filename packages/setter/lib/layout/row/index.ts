import { type SetterMeterialMeta, SetterType } from '@lego/core';
import row from './row.vue';

const layoutRowSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: 'row',
    name: 'layout-row',
    setterName: 'layout-row',
    setterType: SetterType.Layout,
    getMetrial() {
        return row;
    }
};

export default layoutRowSetterMeterial;
export { layoutRowSetterMeterial };
