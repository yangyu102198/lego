import MeterialLoader from './MeterialLoader';
import engin from '../engine';
import {
    type MeterialMeta,
    type MeterialRegister,
    type MeterialConfig
} from '@type/meterialMeta';
import PersistentData from '@utils/persistentData';

/**
 * meterail资源管理器
 * 提供资源加载和资源存储功能
 */
class Meterial {
    public container: Map<string, MeterialMeta>;
    private loader = new MeterialLoader();

    constructor(
        private option: MeterialConfig,
        private engin: engin
    ) {
        // 当资源需要持久化内存的时候
        if (this.option.persistent) {
            this.container = PersistentData.getData('meterial');
        } else {
            this.container = new Map();
        }
    }
    async register(metaOrfn: MeterialRegister) {
        // 获取资源
        const meterialList = await this.loader.register(metaOrfn);

        //可以通过插件修改meterialList
        await this.engin.hooks.meterialRegisterFinish.call(meterialList);
        //修改后的资源做存储
        meterialList.forEach(meta => {
            this.container.set(this.createStoreAlias(meta), meta);
        });
        return meterialList;
    }
    private createStoreAlias(
        meta: Pick<MeterialMeta, 'name' | 'version'>
    ): string {
        return meta.name + '-' + meta.version;
    }
    getMeterialByType(type: MeterialMeta['type'], name?: string) {
        const result: MeterialMeta[] = [];

        this.container.forEach(meta => {
            if (meta.type == type) {
                result.push(meta);
            }
        });

        if (name && result.length) {
            return result.filter(meta => meta.name == name);
        }
        return result;
    }
}
export default Meterial;
