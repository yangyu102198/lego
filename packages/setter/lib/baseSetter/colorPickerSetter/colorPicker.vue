<template>
    <div class="color-picker-setter">
        <ElColorPicker
            @update:modelValue="value => props.applyer.setter(value)"
            :modelValue="props.applyer.getter()"
            v-bind="config"
        ></ElColorPicker>
        <span v-if="config.isShowLabel" class="color-picke__info">
            {{ props.applyer.getter() }}
        </span>
    </div>
</template>
<script lang="ts" setup>
import { ElColorPicker } from 'element-plus';
import { setterDefaultProps } from '@type/setterDefaultProps';
import useConfigHook from '@/component/useConfigHook';
import './style';

const props = defineProps<setterDefaultProps>();
// 预定义颜色
const predefine = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577'
];
const defaultConfig = {
    predefine,
    showAlpha: true,
    isShowLabel: true
};

const config = useConfigHook(props, defaultConfig);
</script>
<style lang="scss" scoped>
.color-picke__info {
    font-size: 12px;
    color: #666;
    margin-left: 10px;
}
.color-picker-setter {
    display: flex;
    align-items: center;
}
</style>
