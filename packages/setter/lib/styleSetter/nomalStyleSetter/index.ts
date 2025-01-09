import { type SetterMeterialMeta } from '@lego/core';
import NomalStyleSetter from './nomalStyle.vue';

const nomalStyleSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '全局样式',
    name: 'normal-style',
    setterName: 'normal-style',
    getMetrial() {
        return NomalStyleSetter;
    }
};

export default nomalStyleSetterMeterial;
export { nomalStyleSetterMeterial };
