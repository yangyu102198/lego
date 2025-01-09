import { type SetterMeterialMeta } from '@lego/core';
import colorPickerSetter from './colorPicker.vue';

const colorPickerMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '颜色选择器',
    name: 'colorPicker',
    setterName: 'colorPicker',
    getMetrial() {
        return colorPickerSetter;
    }
};

export default colorPickerMeterial;
export { colorPickerMeterial };
