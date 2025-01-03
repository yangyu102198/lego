import { type SetterMeterialMeta } from '@lego/core';
import checkboxSetter from './checkboxSetter';

const checkboxSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '单选',
    name: 'checkbox',
    setterName: 'checkbox',
    getMetrial() {
        return checkboxSetter;
    }
};

export default checkboxSetterMeterial;
export { checkboxSetterMeterial };
