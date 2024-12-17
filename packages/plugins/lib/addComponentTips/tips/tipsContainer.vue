<template>
    <div class="tip-container">
        <div
            class="item-hover"
            v-if="!!tipsContainerHook.getHoverNodeMessage()"
            :style="
                getPositionStyle(
                    tipsContainerHook.getHoverNodeMessage()!.position
                )
            "
        ></div>
        <div
            class="item-actived"
            v-for="(item, index) in tipsContainerHook.getActivedNodeMessage()"
            v-bind:key="`actived-${index}`"
            :style="getPositionStyle(item.position)"
        >
            <tips
                :engin="props.engin"
                :treeNode="item.selectedNode"
                :activedNodeController="props.activedNodeController"
            ></tips>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Engin, TreeNode } from '@lego/core';
import { onUnmounted } from 'vue';
import userTipsContainer from './userTipsContainer';
import { ActivedNodeController } from '../ActivedNodeController';
import tips from './tips.vue';
const props = defineProps<{
    engin: Engin;
    containerNode: TreeNode;
    activedNodeController: ActivedNodeController;
}>();
const tipsContainerHook = userTipsContainer(props.engin, props.containerNode);
onUnmounted(tipsContainerHook.unbind);

const getPositionStyle = position => {
    return {
        left: position.left + 'px',
        top: position.top + 'px',
        width: position.width + 'px',
        height: position.height + 'px'
    };
};
</script>
<style lang="scss" scoped>
.tip-container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1000;
    pointer-events: none;
}
.item-hover {
    position: absolute;
    pointer-events: none;
    border: 1px dotted #357af7;
}
.item-actived {
    position: absolute;
    pointer-events: none;
    border: 1px solid #357af7;
}
</style>
