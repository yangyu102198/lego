<template>
    <div class="delete-tip" @click="event => deleteNode(event)" title="删除">
        <icon :icon="props.tip.tipIcon" color="#fff" :size="20"></icon>
    </div>
</template>
<script lang="ts" setup>
import { icon } from '@lego/vue-component';
import { TreeNode, Engin } from '@lego/core';
import BaseTip from './BaseTip';

const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
    tip: BaseTip;
}>();
const deleteNode = _ => {
    props.treeNode.removeSelf();
};
</script>
<style scoped lang="scss">
.delete-tip {
    width: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
