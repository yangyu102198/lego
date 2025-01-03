<template>
    <div>
        <viewComponent></viewComponent>
    </div>
</template>
<script lang="ts" setup>
import { Engin, TreeNode, SetterConfig } from '@lego/core';

const props = defineProps<{
    engin: Engin;
    currentActiveTreeNode: TreeNode;
    setterConfig: SetterConfig;
}>();

const viewComponentInstance = props.engin.hooks.buildSetterInstance.call(
    props.currentActiveTreeNode,
    props.setterConfig
);
const viewComponent = viewComponentInstance.render.bind(viewComponentInstance);
</script>
