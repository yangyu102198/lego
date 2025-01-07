<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane
                :label="item.tabName"
                :name="`active-tab-${index}`"
                v-bind:key="`active-tab-${index}`"
                v-for="(item, index) in getCurrentActiveTreeNodeTab()"
            >
                <div
                    v-for="(setterConfig, setterIndex) in item.setters"
                    v-bind:key="`active-tab-${index}__${setterIndex}_${currentActiveTreeNode.id}`"
                >
                    <setter
                        :engin="props.engin"
                        :treeNode="currentActiveTreeNode"
                        :setterConfig="setterConfig"
                    ></setter>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Engin, TreeNode } from '@lego/core';
import { ElTabPane, ElTabs } from 'element-plus';
import setter from '../setter';

const props = defineProps<{
    engin: Engin;
    activeTreeNode: TreeNode[];
}>();
const activeName = ref('active-tab-0');

const getCurrentActiveTreeNodeTab = () => {
    const node = currentActiveTreeNode.value;
    const tab = node.configApplier.getDefaultConfig('componentEditPanel');
    return tab;
};
const currentActiveTreeNode = computed(() => props.activeTreeNode[0]);
</script>
