import { bindDomEvent, removeDomEvent } from '../utils';
import { dispatchComponentEvent } from './dispatcher';
import { TreeNode } from '@lego/core';
import { DefineComponent } from 'vue';
import { ActivedNodeController } from './ActivedNodeController';

type ComponentCtr = DefineComponent<{ treeNode: TreeNode }>;

const createNewGetmetrialHanler = (
    meterial,
    controller: ActivedNodeController
) => {
    const { getMetrial } = meterial;
    return () => {
        const baseComponent = getMetrial() as ComponentCtr;
        baseComponent.mixins = baseComponent.mixins || [];
        baseComponent.mixins.push({
            mounted() {
                const handler = (eventName, event) => {
                    dispatchComponentEvent(
                        eventName,
                        event,
                        this.$props.treeNode,
                        controller
                    );
                };
                bindDomEvent(
                    this.$el,
                    'mouseover',
                    handler.bind(null, 'mouseover')
                );
                bindDomEvent(
                    this.$el,
                    'mouseout',
                    handler.bind(null, 'mouseout')
                );
                bindDomEvent(this.$el, 'click', handler.bind(null, 'click'));
            },
            beforeUnmount() {
                removeDomEvent(this.$el, ['mouseover', 'mouseout', 'click']);
            }
        });
        return baseComponent;
    };
};

export default createNewGetmetrialHanler;
