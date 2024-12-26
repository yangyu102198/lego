<template>
    <div class="test-container" style="display: inline-block">test</div>
</template>

<script lang="ts" setup>
import { Engin, TreeNode } from '@lego/core';

defineProps<{
    engin: Engin;
    treeNode: TreeNode;
}>();
</script>
