<template>
    <el-row v-bind="props.setterConfig.config || {}" class="row">
        <slot />
    </el-row>
</template>
<script lang="ts" setup>
import { ElRow } from 'element-plus';
import './style';
const props = defineProps<{
    setterConfig: Record<string, any>;
}>();
</script>
<style lang="scss" scoped>
.row {
    margin-bottom: 10px;
}
</style>
