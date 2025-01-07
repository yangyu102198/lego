<template>
    <setter
        :engin="props.engin"
        :treeNode="props.treeNode"
        :setterConfig="{ setter: 'style-editor' }"
    />
    <setter
        :engin="props.engin"
        :treeNode="props.treeNode"
        :setterConfig="{ setter: 'layoutStyle' }"
    />
</template>
<script lang="ts" setup>
import setter from '@lego/vue-component/setter';
import { Engin, TreeNode, SetterConfig } from '@lego/core';

const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    setterConfig: SetterConfig;
}>();
</script>
