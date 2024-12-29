<template>
    <div class="active-editor-panel__title">
        <span
            class="active-editor-panel__breadcrumb"
            v-for="(item, index) in activeTreeNodeAndParent"
            v-bind:key="`breadcrumb-${index}`"
        >
            <icon
                class="breadcrumb__icon--first"
                v-if="index == 0"
                :icon="item.componentIcon"
                color="#a7afbb"
                :size="20"
            ></icon>
            <span
                class="breadcrumb__font"
                @click="
                    () =>
                        index != activeTreeNodeAndParent.length - 1 &&
                        selectNode(item.node)
                "
            >
                {{ item.alias }}
            </span>
            <icon
                class="breadcrumb__icon--arrow"
                v-if="index != activeTreeNodeAndParent.length - 1"
                icon="material-symbols-light:arrow-back-ios"
                color="#a7afbb"
                :size="20"
            ></icon>
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Engin, TreeNode } from '@lego/core';
import icon from '@/components/icon.vue';

const props = defineProps<{
    engin: Engin;
    activeTreeNode: TreeNode[];
}>();
const getActiveTreeNodeAndParent = () => {
    // TODO:当前只处理一个激活节点
    const activeTreeNode = props.activeTreeNode[0];
    const messages: {
        node: TreeNode;
        componentIcon: string;
        alias: string;
    }[] = [];
    // 遍历当前节点的父节点
    activeTreeNode.traveseParent(node => {
        messages.push({
            node,
            componentIcon: node.configApplier.getDefaultConfig('componentIcon'),
            alias: node.configApplier.getDefaultConfig('alias')
        });
    });

    return messages.length > 3 ? messages.slice(0, 3) : messages;
};
const activeTreeNodeAndParent = computed(() => {
    return getActiveTreeNodeAndParent().reverse();
});
const selectNode = (node: TreeNode) => {
    props.engin.treeNodeManager.setSelectedNode(node);
};
</script>
