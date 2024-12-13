<template>
    <div class="block-container">
        <div
            v-if="isEdit && !props.treeNode.childNodes.length"
            class="block-container__no-content"
            :class="[isEdit && pageEditApi.isHightlight() ? 'hightlight' : '']"
            style="height: 60px"
        >
            拖动组件到这里
        </div>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { Engin, TreeNode } from '@lego/core';
import { usePageEdit, type PageEditApi } from './usePageEdit';

const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
}>();
const isEdit = props.engin.option.state == 'edit';
let pageEditApi: PageEditApi;

if (isEdit) {
    pageEditApi = usePageEdit(props.engin, props.treeNode);
}
</script>
