import Engin from '../engine';
import TreeNode from '../nodeManager/TreeNode';
import { SetterConfig, Applyer } from '@type/setter';
import { SetterMeterialMeta, SetterType } from '@type/meterialMeta';

import ApplyerFactory from '../setter/ApplyerFactory';

export const getSetter = (engin: Engin, setterString: string) => {
    return engin.meterialManager.getMeterialByType('setter', setterString)[0];
};

export const getSetterComponentAndApplyer = (
    engin: Engin,
    treeNode: TreeNode,
    setterConfig: SetterConfig
) => {
    let component: any = setterConfig.setter;
    let isLayoutSetter = false;
    let applyer: Applyer | null = null;
    if (typeof setterConfig.setter == 'string') {
        const meterial = getSetter(
            engin,
            setterConfig.setter!
        ) as SetterMeterialMeta;
        isLayoutSetter = !!(
            meterial.setterType && meterial.setterType === SetterType.Layout
        );
        component = meterial.getMetrial();
    }
    if (!component) {
        throw new Error(`[lego/core]: cant find setter ${setterConfig.setter}`);
    }
    // TODO: 当不是布局类的setter时， 创建Applyer赋值器
    if (!isLayoutSetter) {
        applyer = ApplyerFactory(
            {
                engin,
                treeNode,
                prop: setterConfig.prop || ''
            },
            setterConfig.applyer || {}
        );
    }

    return {
        component,
        applyer,
        isLayoutSetter
    };
};
