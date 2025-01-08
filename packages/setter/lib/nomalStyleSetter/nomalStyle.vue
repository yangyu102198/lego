<template>
    <setter
        :engin="props.engin"
        :treeNode="props.treeNode"
        :setterConfig="{ setter: 'style-editor' }"
    />
    <setter
        :engin="props.engin"
        :treeNode="props.treeNode"
        :setterConfig="{ setter: 'layoutStyle' }"
    />
</template>
<script lang="ts" setup>
import setter from '@lego/vue-component/setter';
import { setterDefaultProps } from '@type/setterDefaultProps';

const props = defineProps<setterDefaultProps>();
</script>
