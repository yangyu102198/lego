<template>
    <div class="page-container" ref="pageDom">
        <slot></slot>
        <div
            v-if="isEdit && pageEditApi?.isShow()"
            class="line"
            :style="pageEditApi?.getLinePostion() || ''"
        ></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import { Engin, TreeNode } from '@lego/core';
import { usePageEdit, type PageEditApi } from './usePageEdit';
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
}>();
const pageDom = ref<HTMLElement>();
const isEdit = props.engin.option.state == 'edit';
let pageEditApi: PageEditApi;
if (isEdit) {
    pageEditApi = usePageEdit(pageDom, props.engin);
    onUnmounted(pageEditApi.unbind);
}
</script>
<style lang="scss" scoped>
.line {
    position: absolute;
    background: #2275f6;
}
.page-container {
    position: relative;
    height: 100%;
}
</style>
