<template>
    <div
        class="lock-tip"
        @click="() => handlerLock()"
        :title="isLocked ? '解锁' : '锁定'"
    >
        <icon
            v-if="isLocked"
            icon="material-symbols-light:lock-open-right-outline"
            color="#fff"
            :size="20"
        ></icon>
        <icon
            v-else
            icon="material-symbols-light:lock-outline-sharp"
            color="#fff"
            :size="20"
        ></icon>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import BaseTip from './BaseTip';
import { icon } from '@lego/vue-component';
import { TreeNode, Engin } from '@lego/core';
import { getNodeLocked } from '../../../utils';
import { ActivedNodeController } from '../../ActivedNodeController';

const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
    activedNodeController: ActivedNodeController;
    tip: BaseTip;
}>();

const isLocked = computed(() => {
    const { result } = getNodeLocked(props.treeNode);
    return result;
});

const handlerLock = () => {
    props.treeNode.configApplier.setCurrentConfig(
        'componentEditConfig.locked',
        isLocked.value ? false : true
    );
};
</script>
<style scoped lang="scss">
.lock-tip {
    width: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
