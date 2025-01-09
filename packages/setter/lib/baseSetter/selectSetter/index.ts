import { type SetterMeterialMeta } from '@lego/core';
import selectSetter from './selectSetter.vue';

const selectSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '下拉选择',
    name: 'select',
    setterName: 'select',
    getMetrial() {
        return selectSetter;
    }
};

export default selectSetterMeterial;
export { selectSetterMeterial };
