import Engin from '../engine';
import TreeNode from '../nodeManager/TreeNode';
import { SetterConfig, BaseSetterCtr } from '@type/setter';

export const getSetter = (engin: Engin, setterString: string) => {
    return engin.meterialManager
        .getMeterialByType('setter', setterString)[0]
        .getMetrial();
};

export const buildSetterInstance = (
    engin: Engin,
    treeNode: TreeNode,
    setterConfig: SetterConfig
) => {
    let Ctr: BaseSetterCtr;
    if (typeof setterConfig.setter == 'function') {
        Ctr = setterConfig.setter;
    } else {
        Ctr = getSetter(engin, setterConfig.setter!);
    }
    if (Ctr) {
        return new Ctr(engin, treeNode, setterConfig);
    } else {
        throw new Error(`[lego/core]: cant find setter ${setterConfig.setter}`);
    }
};
