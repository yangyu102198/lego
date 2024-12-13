<template>
    <div class="delete-tip" @click="event => deleteNode(event)">
        <icon
            icon="material-symbols-light:delete-outline-rounded"
            color="#fff"
            :size="20"
        ></icon>
    </div>
</template>
<script lang="ts" setup>
import { icon } from '@lego/vue-component';
import { TreeNode, Engin } from '@lego/core';
const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
}>();
const deleteNode = event => {
    event.stopPropagation();
    props.treeNode.removeSelf();
};
</script>
<style scoped lang="scss">
.delete-tip {
    width: 20px;
    background-color: #006cff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
