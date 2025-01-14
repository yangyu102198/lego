<template>
    <component
        v-if="props.treeNode"
        :is="props.treeNode.configApplier.getCurrentConfig('componentName')"
        :engin="props.engin"
        :treeNode="props.treeNode"
        v-bind="getProps()"
        :style="getStyle()"
    >
        <childComponent
            v-if="treeNode.childNodes.length"
            :childsNode="treeNode.childNodes"
            :engin="props.engin"
        ></childComponent>
    </component>
</template>
<script setup lang="ts">
import { type TreeNode, Engin } from '@lego/core';
import childComponent from './childComponent.vue';
const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
}>();
const getStyle = () => {
    return (
        props.treeNode.configApplier.getCurrentConfig(
            'componentConfig.style'
        ) || ''
    );
};
const getProps = () => {
    return (
        props.treeNode.configApplier.getCurrentConfig(
            'componentConfig.props'
        ) || {}
    );
};
</script>
