import { bindDomEvent, removeDomEvent } from '../utils';
import Dispatcher from './Dispatcher';
import { TreeNode } from '@lego/core';
import { DefineComponent } from 'vue';

type ComponentCtr = DefineComponent<{ treeNode: TreeNode }>;

const createNewGetmetrialHanler = (meterial, dispatcher: Dispatcher) => {
    const { getMetrial } = meterial;
    return () => {
        const baseComponent = getMetrial() as ComponentCtr;
        baseComponent.mixins = baseComponent.mixins || [];
        baseComponent.mixins.push({
            mounted() {
                const handler = (eventName, event) => {
                    dispatcher.dispatchComponentEvent(
                        eventName,
                        event,
                        this.$props.treeNode
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
