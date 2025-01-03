<template>
    <div class="checkbox-setter">
        <el-radio-group v-model="radio" :size="props.setterConfig.size">
            <el-radio-button
                :value="item.value"
                v-for="(item, index) in setterConfig.list"
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
import { ref, watch } from 'vue';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import './style/index.ts';
const props = defineProps<{
    setterConfig: Record<string, any>;
    applyer: Applyer;
}>();

const radio = ref<any>(props.applyer.getter());
const isIcon = item => {
    return !item.type || item.type == 'icon';
};
watch(
    () => radio.value,
    () => {
        props.applyer.setter(radio.value);
    }
);
const getIconSize = () => {
    switch (props.setterConfig.size) {
        case 'large':
            return 24;
        case 'small':
            return 18;
    }
    return 20;
};
</script>
