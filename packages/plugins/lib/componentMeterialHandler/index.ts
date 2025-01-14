import { Engin, type Plugin, ComponentMeterialMeta } from '@lego/core';
import { copy } from '../utils';
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
                            fn(
                                (meterial as ComponentMeterialMeta)
                                    .componentName,
                                component
                            );
                        }
                    });
                }
            });
            // 同步默认属性
            engin.hooks.treeNodeCreate.tap({
                priority: 'post',
                handler: node => {
                    const applier = node.configApplier;
                    const defaultProps: Record<string, any> =
                        applier.getDefaultConfig('componentConfig.props');
                    const synDefaultConfigTOCurrentConfig = () => {
                        const currentProps =
                            applier.getCurrentConfig('componentConfig.props') ||
                            {};
                        applier.setCurrentConfig(
                            'componentConfig.props',
                            currentProps
                        );
                        if (defaultProps) {
                            Object.keys(defaultProps).forEach(key => {
                                const propDefine = defaultProps[key];

                                if (typeof propDefine == 'object') {
                                    if (propDefine.init) {
                                        propDefine.init(node);
                                    }
                                    if (
                                        'default' in propDefine &&
                                        !(key in currentProps)
                                    ) {
                                        currentProps[key] = copy(
                                            propDefine.default
                                        );
                                    }
                                }
                            });
                        }
                    };
                    synDefaultConfigTOCurrentConfig();
                }
            });
        }
    };
};
