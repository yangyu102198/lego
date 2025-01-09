<template>
    <span v-bind="config" class="label">
        {{ config.label }}
    </span>
</template>
<script lang="ts" setup>
import { setterDefaultProps } from '@type/setterDefaultProps';
import useConfigHook from '@/component/useConfigHook';
const props = defineProps<setterDefaultProps>();
const config = useConfigHook(props);
</script>
<style lang="scss" scoped>
.label {
    color: #666;
    font-size: 12px;
    display: inline-flex;
    height: 100%;
    align-items: center;
}
</style>
