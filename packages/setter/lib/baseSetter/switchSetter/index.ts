import { type SetterMeterialMeta } from '@lego/core';
import switchSetter from './switch.vue';

const switchSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '开关',
    name: 'switch',
    setterName: 'switch',
    getMetrial() {
        return switchSetter;
    }
};

export default switchSetterMeterial;
export { switchSetterMeterial };
