<template>
    <elInputWrap
        @update:modelValue="value => props.applyer.setter(value)"
        :modelValue="props.applyer.getter()"
        v-bind="config"
    ></elInputWrap>
</template>
<script lang="ts" setup>
import { ElInput } from 'element-plus';
import useConfigHook from '@/component/useConfigHook';
import { setterDefaultProps } from '@type/setterDefaultProps';
import slotWrap from '../../component/slotWrap';
import './style';

const elInputWrap = slotWrap(ElInput);
const props = defineProps<setterDefaultProps>();
const config = useConfigHook(props, {
    type: 'text'
});
</script>
