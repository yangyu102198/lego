import { type SetterMeterialMeta } from '@lego/core';
import NomalStyleSetter from './NomalStyleSetter';

const nomalStyleSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: '全局样式',
    name: 'nomal-style',
    setterName: 'nomal-style',
    getMetrial() {
        return NomalStyleSetter;
    }
};

export default nomalStyleSetterMeterial;
export { nomalStyleSetterMeterial };
