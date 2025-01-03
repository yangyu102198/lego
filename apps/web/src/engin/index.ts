import { defineAsyncComponent } from 'vue';
import {
    componentMeterialHandler,
    setterMeterialHandler,
    addComponentDrag,
    addComponentTips
} from '@lego/plugins';
import { Engin } from '@lego/core';
import material from '@lego/material';
import setter from '@lego/setter';
import { doOne } from '@/utils';
import { app } from '@/main';
export const getMetrial = doOne(() => {
    return [...material, ...setter];
}, []);

export function getEngin() {
    const engin = new Engin({
        state: 'edit',
        meterial: {
            persistent: true
        },
        plugins: [
            componentMeterialHandler((componentName, component) => {
                app.component(
                    componentName,
                    typeof component == 'function'
                        ? defineAsyncComponent(component)
                        : component
                );
            }),
            setterMeterialHandler((setterName, setter) => {
                app.component(setterName, setter);
            }),
            addComponentDrag(),
            addComponentTips()
        ]
    });
    return engin;
}
