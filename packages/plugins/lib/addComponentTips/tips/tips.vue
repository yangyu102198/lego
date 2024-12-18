<template>
    <div class="tips-wrap" @click="stopPropagation">
        <component
            :is="
                item.render(
                    props.engin,
                    props.treeNode,
                    props.activedNodeController
                )
            "
            v-bind:key="`${item.tipName}-${index}`"
            class="tip-item"
            v-for="(item, index) in getTips()"
        ></component>
    </div>
</template>
<script lang="ts" setup>
import tipsManager from './index';
import { Engin, TreeNode } from '@lego/core';
import { ActivedNodeController } from '../ActivedNodeController';
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    activedNodeController: ActivedNodeController;
}>();
const getTips = () => {
    const treeNodeName =
        props.treeNode.configApplier.getDefaultConfig('componentName');
    return tipsManager.tips.filter(tip => {
        let show = true;
        if (tip.hideComponent && tip.hideComponent.includes(treeNodeName)) {
            show = false;
        }
        if (tip.showComponent && tip.showComponent.includes(treeNodeName)) {
            show = true;
        }
        if (tip.show) {
            const value = tip.show(props.treeNode);
            if (typeof value == 'boolean') {
                show = value;
            }
        }
        return show;
    });
};
const stopPropagation = event => {
    event.stopPropagation();
};
</script>
<style lang="scss" scoped>
.tips-wrap {
    position: absolute;
    top: -24px;
    left: 0px;
    display: flex;
    height: 22px;
    padding: 2px 5px;
    background-color: #006cff;
    border-radius: 2px;
}
.tip-item {
    pointer-events: all;
    margin-right: 4px;
}
.tip-item:last-child {
    margin-right: 0px;
}
</style>
