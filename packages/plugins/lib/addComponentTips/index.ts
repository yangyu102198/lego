import TipsManager from './tips';
import { Engin, type Plugin, type FnType } from '@lego/core';
import ActivedNodeManager from './ActivedNodeController';
import TipsContainerController from './TipsContainerController';
import { dispatchControllerEvent } from './dispatcher';
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
            const dispatchController = dispatchControllerEvent(engin);
            const activedNodeController = ActivedNodeManager.init(
                dispatchController,
                () => engin.treeNodeManager.selectedNode,
                engin
            );

            ObserverResizeManager.init(dispatchController, engin);

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
                                activedNodeController
                            );
                        }
                    });
                }
            });
        }
    };
};
