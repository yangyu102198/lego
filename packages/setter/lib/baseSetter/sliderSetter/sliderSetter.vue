<template>
    <ElSlider
        @update:modelValue="value => props.applyer.setter(value)"
        :modelValue="props.applyer.getter()"
        v-bind="config"
    ></ElSlider>
</template>
<script lang="ts" setup>
import { ElSlider } from 'element-plus';
import { setterDefaultProps } from '@type/setterDefaultProps';
import useConfigHook from '@/component/useConfigHook';
import './style';

const props = defineProps<setterDefaultProps>();
const config = useConfigHook(props);
</script>
