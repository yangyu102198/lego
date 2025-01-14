<template>
    <div class="test-container" style="display: inline-block">
        <span v-if="props.mark">
            <mark>{{ props.textContent }}</mark>
        </span>

        <span v-else>{{ props.textContent }}</span>
    </div>
</template>

<script lang="ts" setup>
import { getProps } from './props';

const props = defineProps(getProps());
</script>
