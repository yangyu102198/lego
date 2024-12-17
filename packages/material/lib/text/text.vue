<template>
    <div class="test-container" style="display: inline-block">
        test{{ a() }}
    </div>
</template>

<script lang="ts" setup>
import { Engin, TreeNode } from '@lego/core';
import a from './a';

defineProps<{
    engin: Engin;
    treeNode: TreeNode;
}>();
</script>
