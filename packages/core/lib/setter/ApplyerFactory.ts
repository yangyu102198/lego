import { Applyer, ApplerExtend, ApplerParams } from '@type/setter';
import { FnType } from '@type/utils';

const ApplyerFactory = (
    params: ApplerParams,
    applerExtend: FnType<[Applyer], ApplerExtend> | ApplerExtend
): Applyer => {
    const resolveProp = prop => {
        return !/componentConfig/.test(prop) ? `componentConfig.${prop}` : prop;
    };
    const instance = {
        prop: resolveProp(params.prop),
        treeNode: params.treeNode,
        engin: params.engin,
        getter(key) {
            const { treeNode, prop } = this;
            key = key || prop;
            return treeNode.configApplier.getCurrentConfig(resolveProp(key));
        },
        setter(key, value) {
            const { treeNode, prop } = this;
            if (value === undefined) {
                value = key;
                key = prop;
            }
            treeNode.configApplier.setCurrentConfig(resolveProp(prop), value);
        }
    };
    if (typeof applerExtend == 'function') {
        applerExtend = applerExtend(instance);
    }
    return Object.assign(instance, applerExtend);
};

export default ApplyerFactory;
