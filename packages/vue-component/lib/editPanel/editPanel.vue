<template>
    <div style="height: 100%">
        <nodeComponent
            v-if="treeNodeManager.rootNodeActived"
            :engin="props.engin"
            :treeNode="treeNodeManager.rootNodeActived"
        ></nodeComponent>
    </div>
</template>
<script lang="ts" setup>
import { Engin } from '@lego/core';
import nodeComponent from '@lego/vue-component/nodeComponent';
const props = defineProps<{
    engin: Engin;
}>();
const { treeNodeManager } = props.engin;
</script>
