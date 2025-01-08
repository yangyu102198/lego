import { type SetterMeterialMeta, SetterType } from '@lego/core';

import label from './label.vue';

const layoutLabelSetterMeterial: SetterMeterialMeta = {
    version: 'v0.1.1',
    type: 'setter',
    alias: 'label',
    name: 'layout-label',
    setterName: 'layout-label',
    setterType: SetterType.Layout,
    getMetrial() {
        return label;
    }
};

export default layoutLabelSetterMeterial;
export { layoutLabelSetterMeterial };
