<template>
    <el-select
        @update:modelValue="value => props.applyer.setter(value)"
        :modelValue="props.applyer.getter()"
        v-bind="config"
        placeholder="请选择"
        no-data-text="无数据"
    >
        <el-option
            v-for="item in config.list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption } from 'element-plus';
import { setterDefaultProps } from '@type/setterDefaultProps';
import useConfigHook from '@/component/useConfigHook';
import './style';

const props = defineProps<setterDefaultProps>();
const config = useConfigHook(props, {
    list: []
});
</script>
