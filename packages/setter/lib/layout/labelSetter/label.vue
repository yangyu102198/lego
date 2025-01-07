<template>
    <span :style="getStyle()" class="label">
        {{ props.setterConfig.config.label }}
    </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
    setterConfig: Record<string, any>;
}>();
const getStyle = () => {
    return props.setterConfig.config?.style || '';
};
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
