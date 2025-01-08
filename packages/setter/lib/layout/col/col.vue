<template>
    <el-col v-bind="getConfig(props, $attrs)">
        <slot />
    </el-col>
</template>
<script lang="ts" setup>
import { ElCol } from 'element-plus';
import { getConfig } from '@utils/index';
import { setterDefaultProps } from '@type/setterDefaultProps';
import './style';
const props = defineProps<setterDefaultProps>();
</script>
