<template>
    <component :is="currentComponent" v-bind="getProps()">
        <setter-children
            v-if="hasChild"
            :childrenSetterConfig="props.setterConfig.children!"
            :engin="props.engin"
            :treeNode="props.treeNode"
        ></setter-children>
    </component>
</template>
<script lang="ts" setup>
import {
    Engin,
    TreeNode,
    SetterConfig,
    getSetterComponentAndApplyer
} from '@lego/core';
import setterChildren from './setterChildren.vue';

const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    setterConfig: SetterConfig;
}>();
const hasChild = !!props.setterConfig.children?.length;
// 获取对应的setter组件和applyer赋值器
const {
    component: currentComponent,
    applyer,
    isLayoutSetter
} = getSetterComponentAndApplyer(
    props.engin,
    props.treeNode,
    props.setterConfig
);
const getProps = () => {
    const propsObj: Record<string, any> = {
        setterConfig: props.setterConfig
    };
    // 当不是布局setter的话，传入参数
    if (!isLayoutSetter) {
        propsObj.applyer = applyer;
        propsObj.engin = props.engin;
        propsObj.treeNode = props.treeNode;
    }
    return propsObj;
};
</script>
