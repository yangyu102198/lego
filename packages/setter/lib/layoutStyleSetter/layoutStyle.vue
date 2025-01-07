<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="布局" name="1">
            <setter
                :engin="props.engin"
                :treeNode="props.treeNode"
                :setterConfig="config.layout"
                key="layout"
            />
            <div v-if="showFlexConfig()">
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.flexDirection"
                    key="flex-direction"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.justifyContent"
                    key="justify-content"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.alignItems"
                    key="align-items"
                />
            </div>
            <marginStyle :applyer="config.marginApplyer"></marginStyle>
        </el-collapse-item>
    </el-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import setter from '@lego/vue-component/setter';
import {
    Engin,
    TreeNode,
    SetterConfig,
    Applyer,
    ApplyerFactory
} from '@lego/core';
import {
    createLayoutModeConfig,
    createFlexDirectionConfig,
    createJustifyContentConfig,
    createAlignItemsConfig,
    createApplyer
} from './createConfig';
import { ElCollapse, ElCollapseItem } from 'element-plus';
import marginStyle from './marginStyle.vue';
import './style';

const activeNames = ref('1');
const props = defineProps<{
    engin: Engin;
    treeNode: TreeNode;
    setterConfig: SetterConfig;
    applyer: Applyer;
}>();
const config = {
    layout: createLayoutModeConfig(),
    flexDirection: createFlexDirectionConfig(),
    justifyContent: createJustifyContentConfig(),
    alignItems: createAlignItemsConfig(),
    marginApplyer: ApplyerFactory(
        {
            engin: props.engin,
            treeNode: props.treeNode,
            prop: 'style'
        },
        createApplyer()
    )
};
const Reg = /display:([^;\n]*)[;\n]/;
const showFlexConfig = () => {
    const styleValue =
        props.applyer.getter(props.setterConfig.prop || 'style') || '';
    const match = Reg.exec(styleValue);
    const display = match ? match[1] : '';
    return display.trim() == 'flex';
};
</script>
