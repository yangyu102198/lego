import { type SetterMeterialMeta } from '@lego/core';
import inputSetter from './inputSetter.vue';

const inputSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '单选',
    name: 'input',
    setterName: 'input',
    getMetrial() {
        return inputSetter;
    }
};

export default inputSetterMeterial;
export { inputSetterMeterial };
