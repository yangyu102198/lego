import { defineAsyncComponent } from 'vue';
import {
    componentMeterialHandler,
    addComponentDrag,
    addComponentTips
} from '@lego/plugins';
import { Engin } from '@lego/core';
import material from '@lego/material';
import { doOne } from '@/utils';
import { app } from '@/main';
export const getMetrial = doOne(() => {
    return [...material];
}, []);

export function getEngin() {
    const engin = new Engin({
        state: 'edit',
        meterial: {
            persistent: true
        },
        plugins: [
            componentMeterialHandler((name, component) => {
                app.component(
                    name,
                    typeof component == 'function'
                        ? defineAsyncComponent(component)
                        : component
                );
            }),
            addComponentDrag(),
            addComponentTips()
        ]
    });
    return engin;
}
