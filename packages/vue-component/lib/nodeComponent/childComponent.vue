<template>
    <nodeComponent
        v-for="child in props.childsNode"
        :key="child.id"
        :treeNode="child"
        :engin="props.engin"
        :t="child.id"
    ></nodeComponent>
</template>
<script setup lang="ts">
import { TreeNode, Engin } from '@lego/core';
import nodeComponent from './nodeComponent.vue';
const props = defineProps<{
    childsNode: TreeNode[];
    engin: Engin;
}>();
</script>
