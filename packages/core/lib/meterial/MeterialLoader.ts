import {
    type MeterialMeta,
    type GetMeterialMeta,
    type MeterialRegister
} from '@type/meterialMeta';
import Queue from '../utils/Queue';
import createPromiseCallback from '../utils/createPromiseCallback';

// 物料加载器
class MeterialLoader {
    private queue = new Queue();
    private registerList: MeterialMeta[] = [];
    constructor() {}
    async register(metaOrfn: MeterialRegister) {
        this.registerList.length = 0;
        // 递归获取物料内容
        await this.handlerRegister(metaOrfn);
        // 返回本次物料内容
        return this.registerList;
    }

    private async handlerRegister(metaOrfn: MeterialRegister) {
        const metaLists = !Array.isArray(metaOrfn) ? [metaOrfn] : metaOrfn;
        const waitList: Promise<unknown>[] = [];

        for (const meta of metaLists) {
            if (typeof meta === 'function') {
                const promiseCallback = createPromiseCallback();
                waitList.push(promiseCallback.promise);
                this.handleGetFuntion(meta, promiseCallback);
            } else {
                this.registerList.push(meta);
            }
        }

        await Promise.all(waitList);
    }
    private handleGetFuntion(getFun: GetMeterialMeta, promiseCallback) {
        //控制并发数
        this.queue
            .run(getFun)
            .then(result => {
                return this.handlerRegister(result);
            })
            .then(promiseCallback, promiseCallback);
    }
}

export default MeterialLoader;
