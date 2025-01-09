<template>
    <div class="setter-collapse-wrap">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="文字" name="1">
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.fontAndLine"
                    key="fontAndLine"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.fontWeight"
                    key="fontWeight"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.fontFamily"
                    key="fontFamily"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.fontColor"
                    key="fontColor"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.textAlign"
                    key="textAlign"
                />
                <setter
                    :engin="props.engin"
                    :treeNode="props.treeNode"
                    :setterConfig="config.opacity"
                    key="opacity"
                />
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import setter from '@lego/vue-component/setter';
import { ElCollapse, ElCollapseItem } from 'element-plus';
import { setterDefaultProps } from '@type/setterDefaultProps';
import {
    createFontAndLineHeightConfig,
    createFontWeightConfig,
    createFontFamilyConfig,
    createFontColorConfig,
    createTextAlignConfig,
    createOpacityrConfig
} from './createConfig';
import './style';

const activeNames = ref('1');
const props = defineProps<setterDefaultProps>();
const config = {
    fontAndLine: createFontAndLineHeightConfig(),
    fontWeight: createFontWeightConfig(),
    fontFamily: createFontFamilyConfig(),
    fontColor: createFontColorConfig(),
    textAlign: createTextAlignConfig(),
    opacity: createOpacityrConfig()
};
</script>
