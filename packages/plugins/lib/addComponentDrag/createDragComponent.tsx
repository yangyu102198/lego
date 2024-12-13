import { DefineComponent } from 'vue';
import { TreeNode, ComponentLayoutName } from '@lego/core';
import { bindDomEvent, removeDomEvent } from '../utils';

type ComponentCtr = DefineComponent<{ treeNode: TreeNode }>;

const canDrag = treeNode => {
    // 先查看当前配置,在查看默认配置
    // 如组件的内部的块容器会修改当前配置drag=false
    const currentConfigCanDrag = treeNode.configApplier.getCurrentConfig(
        'componentEditConfig.drag'
    );
    const defaultConfigCanDrag = treeNode.configApplier.getDefaultConfig(
        'componentEditConfig.drag'
    );
    if (typeof currentConfigCanDrag == 'boolean') {
        return currentConfigCanDrag;
    } else if (typeof defaultConfigCanDrag == 'boolean') {
        return defaultConfigCanDrag;
    }
    return true;
};

const handlerDragEvent = (id, nodeLayoutType) => event => {
    event.stopPropagation();
    (window as any).__tmpLayoutData = {
        layout: {
            target: nodeLayoutType,
            id: id
        }
    };
};

export default meterial => {
    const { getMetrial } = meterial;
    const nodeLayoutType: ComponentLayoutName =
        meterial.componentLayoutType || ComponentLayoutName.Atom;

    return () => {
        const baseComponent = getMetrial() as ComponentCtr;
        baseComponent.mixins = baseComponent.mixins || [];
        baseComponent.mixins.push({
            mounted() {
                const treeNode = this.$props.treeNode;
                if (canDrag(treeNode) && this.$el) {
                    this.$el.draggable = true;
                    bindDomEvent(
                        this.$el,
                        'dragstart',
                        handlerDragEvent(treeNode.id, nodeLayoutType)
                    );
                }
            },
            beforeUnmount() {
                removeDomEvent(this.$el, 'dragstart');
            }
        });
        return baseComponent;
    };
};
