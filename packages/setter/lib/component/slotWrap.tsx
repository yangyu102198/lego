import { h, Component } from 'vue';
import { getSlots } from '@utils/index';

function slotWrap(component: Component) {
    return {
        name: 'SlotWrap',
        render() {
            return h(
                component,
                {
                    ...this.$attrs
                },
                getSlots(this.$parent.$props, this.$parent.$slots || {})
            );
        }
    } as Component;
}

export default slotWrap;
