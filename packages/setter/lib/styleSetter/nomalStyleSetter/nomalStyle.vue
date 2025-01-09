<template>
    <div class="nomal-style-setter">
        <setter
            :engin="props.engin"
            :treeNode="props.treeNode"
            :setterConfig="{ setter: 'style-editor' }"
            style="margin-bottom: 10px"
        />
        <setter
            :engin="props.engin"
            :treeNode="props.treeNode"
            :setterConfig="{ setter: 'layoutStyle' }"
            style="margin-bottom: 10px"
        />
        <setter
            :engin="props.engin"
            :treeNode="props.treeNode"
            :setterConfig="{ setter: 'fontStyle' }"
        />
    </div>
</template>
<script lang="ts" setup>
import setter from '@lego/vue-component/setter';
import { setterDefaultProps } from '@type/setterDefaultProps';
import './style';

const props = defineProps<setterDefaultProps>();
</script>
<style lang="scss" scoped>
.nomal-style-setter {
    padding: 10px;
}
</style>
