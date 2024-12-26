<template>
    <div class="inner-container" style="display: inline-block">
        <innerBlockComponent
            :index="0"
            :parentTreeNode="props.treeNode"
            :engin="props.engin"
        ></innerBlockComponent>
    </div>
</template>

<script lang="ts" setup>
import { Engin, TreeNode } from '@lego/core';
import innerBlockComponent from '../component/innerBlockComponent.jsx';
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
}>();
</script>
