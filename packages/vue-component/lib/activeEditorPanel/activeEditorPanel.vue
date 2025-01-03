<template>
    <div v-if="RD.activeTreeNode.length" class="acive-editor-panel__wrap">
        <activeEditorTitle
            :engin="props.engin"
            :active-tree-node="RD.activeTreeNode"
        ></activeEditorTitle>
        <activeEditorConfig
            :engin="props.engin"
            :active-tree-node="RD.activeTreeNode"
        ></activeEditorConfig>
    </div>
    <div v-else>
        <span>请在左侧画布选中节点</span>
    </div>
</template>
<script lang="ts" setup>
import { reactive, onBeforeUnmount } from 'vue';
import { type Engin } from '@lego/core';
import activeEditorTitle from './activeEditorTitle.vue';
import activeEditorConfig from './activeEditorConfig.vue';
const props = defineProps<{
    engin: Engin;
}>();
const RD = reactive<{
    activeTreeNode: any[];
}>({
    activeTreeNode: []
});
const removeSelected = props.engin.hooks.selectedNode.tap(nodes => {
    RD.activeTreeNode = [...nodes];
});
onBeforeUnmount(removeSelected);
</script>
