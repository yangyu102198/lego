import { Engin, type Plugin, SetterMeterialMeta } from '@lego/core';

/**
 * 组件初始化插件，
 * 可以用于vue组件的注册，缓存等工作
 * @param
 * @returns
 */
type Fn = (name: string, component: any) => unknown;
export const setterMeterialHandler = (fn: Fn): Plugin => {
    return {
        name: 'setterMeterialHandler',
        apply(engin: Engin) {
            engin.hooks.meterialRegisterFinish.tap({
                priority: 'post',
                handler: meterialList => {
                    meterialList.forEach(meterial => {
                        if (meterial.type == 'setter') {
                            const setter = meterial.getMetrial();

                            fn(
                                (meterial as SetterMeterialMeta).setterName,
                                setter
                            );
                        }
                    });
                }
            });
        }
    };
};
