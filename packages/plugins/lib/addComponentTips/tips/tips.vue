<template>
    <div class="tips-wrap">
        <component
            :is="item.render(props.engin, props.treeNode)"
            v-bind:key="`${item.tipsName}-${index}`"
            class="tip-item"
            v-for="(item, index) in getTips()"
        ></component>
    </div>
</template>
<script lang="ts" setup>
import tipsManager from './index';
import { Engin, TreeNode } from '@lego/core';
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
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
</script>
<style lang="scss" scoped>
.tips-wrap {
    position: absolute;
    top: -22px;
    left: 0px;
    display: flex;
    height: 20px;
}
.tip-item {
    pointer-events: all;
}
</style>
