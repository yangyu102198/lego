<template>
    <el-switch
        @update:modelValue="value => props.applyer.setter(value)"
        :modelValue="props.applyer.getter()"
        v-bind="config"
    />
</template>
<script lang="ts" setup>
import { ElSwitch } from 'element-plus';
import { setterDefaultProps } from '@type/setterDefaultProps';
import useConfigHook from '@/component/useConfigHook';
import './style';

const props = defineProps<setterDefaultProps>();
const config = useConfigHook(props);
</script>
