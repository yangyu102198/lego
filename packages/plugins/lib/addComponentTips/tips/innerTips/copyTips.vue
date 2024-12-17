<template>
    <div class="delete-tip" @click="event => copyNode(event)">
        <icon
            icon="material-symbols-light:copy-all-outline"
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
const copyNode = _ => {
    const { parentNode } = props.treeNode;
    if (parentNode) {
        const node = props.engin.treeNodeManager.copyNodeAndChild(
            props.treeNode
        );
        // 获取当前节点在父节点的位置，
        // 新节点添加在当前节点后面一位
        const index = parentNode.getChldNodeIndex(props.treeNode);
        parentNode.insertNode(index + 1, node);
    }
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
