<template>
    <component
        v-if="props.treeNode"
        :is="props.treeNode.configApplier.getCurrentConfig('componentName')"
        :engin="props.engin"
        :treeNode="props.treeNode"
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
</script>
