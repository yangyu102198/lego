<template>
    <div class="checkbox-setter">
        <el-radio-group
            @update:modelValue="value => props.applyer.setter(value)"
            :modelValue="props.applyer.getter()"
            :size="props.setterConfig.config?.size || 'small'"
        >
            <el-radio-button
                :value="item.value"
                v-for="(item, index) in getList()"
                :key="`checkbox-setter-${index}`"
            >
                <icon
                    v-if="isIcon(item)"
                    :icon="item.label"
                    :size="getIconSize()"
                    color="#333"
                />
                <span v-else>{{ item.label }}</span>
            </el-radio-button>
        </el-radio-group>
    </div>
</template>
<script lang="ts" setup>
import { Applyer } from '@lego/core';
import { icon } from '@lego/vue-component';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import './style';

const props = defineProps<{
    setterConfig: Record<string, any>;
    applyer: Applyer;
}>();
const isIcon = item => {
    return !(item.type && item.type != 'icon');
};
const getIconSize = () => {
    const { config } = props.setterConfig || {};
    switch (config.size) {
        case 'large':
            return 24;
        case 'small':
            return 18;
    }
    return 20;
};
const getList = () => {
    return props.setterConfig.config?.list || [];
};
</script>
