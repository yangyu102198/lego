<template>
    <el-col v-bind="props.setterConfig.config || {}">
        <slot />
    </el-col>
</template>
<script lang="ts" setup>
import { ElCol } from 'element-plus';
import './style';
const props = defineProps<{
    setterConfig: Record<string, any>;
}>();
</script>
