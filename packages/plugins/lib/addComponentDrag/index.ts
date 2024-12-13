import { Engin, type Plugin, ComponentLayoutName } from '@lego/core';
import createDragComponent from './createDragComponent';
import AbsoluteLayout from './AbsoluteLayout';
import BlockLayout from './BlockLayout';
import AtomLayout from './AtomLayout';
import PageLayout from './PageLayout';
import LayoutEventLinker from './LayoutEventLinker';
import { createLayoutEventLinkerHandler } from './dispatcher';

const LayoutCtrMap = {
    [ComponentLayoutName.Atom]: AtomLayout,
    [ComponentLayoutName.Absolute]: AbsoluteLayout,
    [ComponentLayoutName.Block]: BlockLayout,
    [ComponentLayoutName.Page]: PageLayout
};

const bindTreeNodeCreateHook = engin => {
    engin.hooks.treeNodeCreate.tap(node => {
        // 获取当前节点的布局类型，没有配置的话为原子布局
        const nodeLayout: ComponentLayoutName =
            node.configApplier.getDefaultConfig('componentLayoutType') ||
            ComponentLayoutName.Atom;
        if (nodeLayout == ComponentLayoutName.Atom) {
            return;
        }
        let linker: LayoutEventLinker;
        // 当节点和组件绑定的时候，创建linker，并且绑定组件根节点的拖动事件
        node.event.on('setComponent', (component: any) => {
            // 创建对应的区域
            const specilLayout = new LayoutCtrMap[nodeLayout](node.id);
            // 创建区域连接器
            linker = new LayoutEventLinker(
                node,
                specilLayout,
                createLayoutEventLinkerHandler(engin, node)
            );
            linker.addNodeLister(component.$el);
        });

        node.event.on('destroyedComponent', () => {
            if (linker) {
                linker.destroyed();
            }
        });
    });
};

const bindMeterialRegisterFinishHook = engin => {
    engin.hooks.meterialRegisterFinish.tap({
        handler: meterialList => {
            meterialList.forEach(meterial => {
                if (meterial.type == 'component') {
                    meterial.getMetrial = createDragComponent(meterial);
                }
            });
        }
    });
};

export const addComponentDrag = (): Plugin => {
    return {
        name: 'ComponentDrag',
        apply(engin: Engin) {
            if (engin.option.state != 'edit') {
                return;
            }
            bindTreeNodeCreateHook(engin);
            bindMeterialRegisterFinishHook(engin);
            // 创建一个代理节点
        }
    };
};
