import emitter from '../utils/emitter';
import { EnginConfig } from '@type/enginConfig';
import Meterial from '../meterial';
import { spcialHookFactory } from '../hook';
import { HookMapHookInstance, HooksInstanceDriver } from '@type/hookInstance';
import TreeNodeManager from '../nodeManager/TreeNodeManager';
import { buildSetterInstance } from '../utils/buildSetter';

/**
 * 引擎的流程中心
 */
class Engine {
    meterialManager!: Meterial;
    treeNodeManager!: TreeNodeManager;
    eventBus = emitter();
    hooks: HooksInstanceDriver = {} as any;
    constructor(public option: EnginConfig) {
        this.initHooks();
        this.initPlugins();
    }
    initHooks() {
        Object.entries(HookMapHookInstance).forEach(
            ([hookName, spcailHookid]) => {
                this.hooks[hookName] = spcialHookFactory(spcailHookid);
            }
        );
    }
    initPlugins() {
        this.option.plugins?.forEach(plugin => {
            const apply = typeof plugin == 'object' ? plugin.apply : plugin;
            apply(this);
        });
        this.hooks.pluginInited.call(this);
    }
    private initInnerHooks() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const engin = this;
        this.hooks.buildSetterInstance.tap({
            priority: 'post',
            handler(treeNode, config) {
                return buildSetterInstance(engin, treeNode, config);
            }
        });
    }
    async init() {
        // 调用options钩子，修改options
        await this.hooks.options.call(this.option);
        this.meterialManager = new Meterial(this.option.meterial || {}, this);
        this.treeNodeManager = new TreeNodeManager(
            this.hooks,
            this.meterialManager
        );
        await this.hooks.inited.call(this);
        this.initInnerHooks();
        (window as any).engin = this;
    }
}
export default Engine;
