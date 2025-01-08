<template>
    <el-row v-bind="getConfig(props, $attrs)" class="row">
        <slot />
    </el-row>
</template>
<script lang="ts" setup>
import { ElRow } from 'element-plus';
import { getConfig } from '@utils/index';
import { setterDefaultProps } from '@type/setterDefaultProps';
import './style';
const props = defineProps<setterDefaultProps>();
</script>
<style lang="scss" scoped>
.row {
    margin-bottom: 10px;
}
</style>
