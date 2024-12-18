<template>
    <div class="identifier-tip">
        <el-dropdown
            popper-class="identifier-tip__dropdown"
            v-if="parentNodeMessage.length"
        >
            <div class="identifier-tip__info">
                <icon
                    :icon="currentNodeMessage.componentIcon"
                    color="#fff"
                    :size="20"
                ></icon>
                {{ currentNodeMessage.alias }}
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        :key="`${index}-item.node.id`"
                        v-for="(item, index) in parentNodeMessage"
                    >
                        <div
                            class="identifier-tip__content"
                            @click="selectedNode(item)"
                        >
                            <icon
                                :icon="item.componentIcon"
                                color="#fff"
                                :size="20"
                            ></icon>
                            {{ item.alias }}
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div class="identifier-tip__info" v-else>
            <icon
                :icon="currentNodeMessage.componentIcon"
                color="#fff"
                :size="20"
            ></icon>
            {{ currentNodeMessage.alias }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { icon } from '@lego/vue-component';
import { TreeNode, Engin } from '@lego/core';
import { ActivedNodeController } from '../../ActivedNodeController';
import { computed } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus';
import 'element-plus/es/components/dropdown/style/index';
import 'element-plus/es/components/dropdown-item/style/index';
import 'element-plus/es/components/dropdown-menu/style/index';

const props = defineProps<{
    treeNode: TreeNode;
    engin: Engin;
    activedNodeController: ActivedNodeController;
}>();
type NodeMessage = {
    node: TreeNode;
    componentIcon: string;
    alias: string;
};
const getChainNodeMessage = (): NodeMessage[] => {
    const nodeChain: NodeMessage[] = [];
    // 获取当前节点和祖先节点的信息
    props.treeNode.traveseParent(node => {
        nodeChain.push({
            node,
            componentIcon: node.configApplier.getDefaultConfig('componentIcon'),
            alias: node.configApplier.getDefaultConfig('alias')
        });
    });

    return nodeChain;
};
const selectedNode = (item: NodeMessage) => {
    props.activedNodeController.handlerSelectedNodes(item.node);
};
const currentNodeMessage = computed(() => {
    return getChainNodeMessage()[0];
});
const parentNodeMessage = computed(() => {
    return getChainNodeMessage().slice(1);
});
</script>
<style lang="scss">
.identifier-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    .el-tooltip__trigger {
        outline: none !important;
    }
    .identifier-tip__info {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 12px;
        border-right: 1px solid #1163d1;
        padding-right: 5px;
    }
}
.identifier-tip__dropdown {
    border: none !important;
    .el-dropdown-menu {
        background-color: #494848;
    }
    .el-popper__arrow::before {
        background-color: #494848 !important;
    }
    .identifier-tip__content {
        color: #fff;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .el-dropdown-menu__item {
        padding: 0px 8px;
        &:hover {
            background: none;
            color: #fff;
        }
    }
}
.tip-item:last-child .identifier-tip__info {
    border-right: none;
    padding-right: 0;
}
</style>
