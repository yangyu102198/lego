<template>
    <img :src="props.src" :title="props.title" :alt="props.alt" />
</template>

<script lang="ts" setup>
import { getProps } from './props';
const props = defineProps(getProps());
</script>
