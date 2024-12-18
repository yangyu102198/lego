<template>
    <div class="copy-tip" @click="event => copyNode(event)" title="复制">
        <icon :icon="props.tip.tipIcon" color="#fff" :size="20"></icon>
    </div>
</template>
<script lang="ts" setup>
import { icon } from '@lego/vue-component';
import { TreeNode, Engin } from '@lego/core';
import { ActivedNodeController } from '../../ActivedNodeController';
import { immediate } from '../../../utils';
import BaseTip from './BaseTip';

const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
    activedNodeController: ActivedNodeController;
    tip: BaseTip;
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
        // 选中当前节点
        immediate(() => props.activedNodeController.handlerSelectedNodes(node));
    }
};
</script>
<style scoped lang="scss">
.copy-tip {
    width: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
