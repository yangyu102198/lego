<template>
    <span v-bind="getConfig(props, $attrs)" class="label">
        {{ getConfig(props).label }}
    </span>
</template>
<script lang="ts" setup>
import { getConfig } from '@utils/index';
import { setterDefaultProps } from '@type/setterDefaultProps';
const props = defineProps<setterDefaultProps>();
</script>
<style lang="scss" scoped>
.label {
    color: rgb(0 0 0 / 60%);
    font-size: 12px;
    display: inline-flex;
    height: 100%;
    align-items: center;
}
</style>
