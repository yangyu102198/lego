import { Engin, type Plugin } from '@lego/core';

/**
 * 组件初始化插件，
 * 可以用于vue组件的注册，缓存等工作
 * @param
 * @returns
 */
type Fn = (name: string, component: any) => unknown;
export const componentMeterialHandler = (fn: Fn): Plugin => {
    return {
        name: 'componentMeterialHandler',
        apply(engin: Engin) {
            engin.hooks.meterialRegisterFinish.tap({
                priority: 'post',
                handler: meterialList => {
                    meterialList.forEach(meterial => {
                        if (meterial.type == 'component') {
                            const component = meterial.getMetrial();
                            // 当组件创建和销毁时，通知
                            component.mixins = component.mixins || [];
                            component.mixins.push({
                                mounted() {
                                    if (this.$props.treeNode) {
                                        this.$props.treeNode.setComponent(this);
                                    }
                                },
                                beforeUnmount() {
                                    if (this.$props.treeNode)
                                        this.$props.treeNode.destroyedComponent();
                                }
                            });
                            fn(meterial.name, component);
                        }
                    });
                }
            });
        }
    };
};
