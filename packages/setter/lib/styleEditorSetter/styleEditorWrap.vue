<template>
    <setter
        :engin="props.engin"
        :treeNode="props.treeNode"
        :setterConfig="newSetterConfig"
    />
</template>
<script lang="ts" setup>
import setter from '@lego/vue-component/setter';
import styleEditorComponent from './styleEditor.vue';
import { Engin, TreeNode, SetterConfig, Applyer } from '@lego/core';
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    setterConfig: SetterConfig;
    applyer?: Applyer;
}>();
const newSetterConfig: SetterConfig = {
    prop: 'style',
    applyer(instance) {
        const oldGetter = instance.getter.bind(instance);
        const oldSetter = instance.setter.bind(instance);
        return {
            getter() {
                return `#main {${oldGetter() || ''}}`;
            },
            setter(value: string) {
                const valueExp = /#main \{([^}]*)\}/;
                const execResult = valueExp.exec(value);
                value = execResult ? execResult[1] : '';
                oldSetter(value);
            }
        };
    },
    ...props.setterConfig,
    setter: styleEditorComponent
};
</script>
