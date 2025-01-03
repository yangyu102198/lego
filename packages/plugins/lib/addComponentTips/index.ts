import TipsManager from './tips';
import { Engin, type Plugin, type FnType } from '@lego/core';
import ActivedNodeManager from './ActivedNodeController';
import TipsContainerController from './TipsContainerController';
import Dispatcher from './Dispatcher';
import ObserverResizeManager from './ObserverResize';
import createNewGetmetrialHanler from './createNewGetmetrialHanler';

export const addComponentTips = (
    tipsHandler?: FnType<(typeof TipsManager)[], void>
): Plugin => {
    if (tipsHandler) {
        tipsHandler(TipsManager);
    }
    return {
        name: 'addComponentTips',
        apply(engin: Engin) {
            if (engin.option.state != 'edit') {
                return;
            }
            // 创建分发器
            const dispatcher = new Dispatcher(engin);
            // 创建节点激活控制器
            const activedNodeController = ActivedNodeManager.init(
                dispatcher,
                engin
            );
            // 创建节点尺寸变化管理者
            ObserverResizeManager.init(dispatcher, engin);
            engin.hooks.treeNodeCreate.tap(node => {
                if (
                    node.configApplier.getDefaultConfig('componentName') ==
                    'pageContainer'
                ) {
                    TipsContainerController.addContainer(
                        node,
                        engin,
                        activedNodeController
                    );
                }
            });
            engin.hooks.meterialRegisterFinish.tap({
                handler: meterialList => {
                    meterialList.forEach(meterial => {
                        if (meterial.type == 'component') {
                            meterial.getMetrial = createNewGetmetrialHanler(
                                meterial,
                                dispatcher
                            );
                        }
                    });
                }
            });
        }
    };
};
