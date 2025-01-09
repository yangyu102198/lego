import { type SetterMeterialMeta } from '@lego/core';
import sliderSetter from './sliderSetter.vue';

const sliderSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '滑块',
    name: 'slider',
    setterName: 'slider',
    getMetrial() {
        return sliderSetter;
    }
};

export default sliderSetterMeterial;
export { sliderSetterMeterial };
