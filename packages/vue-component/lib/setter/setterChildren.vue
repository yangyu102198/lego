<template>
    <setter
        v-for="(config, index) in props.childrenSetterConfig"
        v-bind:key="`setter-${index}`"
        :engin="props.engin"
        :tree-node="props.treeNode"
        :setterConfig="config"
    ></setter>
</template>
<script lang="ts" setup>
import { Engin, TreeNode, SetterConfig } from '@lego/core';
import setter from './setter.vue';

const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    childrenSetterConfig: SetterConfig[];
}>();
</script>
