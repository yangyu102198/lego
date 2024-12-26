import { Applyer, ApplyerConfig } from './types/setter';

const ApplyerFactory = (
    applyerConfig: ApplyerConfig,
    appler: Partial<Applyer> = {}
): Applyer => {
    return Object.assign(
        {
            key: applyerConfig.key || '',
            treeNode: applyerConfig.treeNode,
            getter() {
                const { treeNode, key } = this;
                if (treeNode && key) {
                    return treeNode.configApplier.getCurrentConfig(key);
                }
            },
            setter(value) {
                const { treeNode, key } = this;
                if (treeNode && key) {
                    return treeNode.configApplier.setCurrentConfig(key, value);
                }
            }
        },
        appler
    );
};

export default ApplyerFactory;
