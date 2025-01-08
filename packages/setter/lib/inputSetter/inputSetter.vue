<template>
    <elInputWrap
        @update:modelValue="value => props.applyer.setter(value)"
        :modelValue="props.applyer.getter()"
        v-bind="getConfig(props, $attrs)"
    ></elInputWrap>
</template>
<script lang="ts" setup>
import { ElInput } from 'element-plus';
import { getConfig } from '@utils/index';
import { setterDefaultProps } from '@type/setterDefaultProps';
import slotWrap from '../component/slotWrap';
import './style';

const elInputWrap = slotWrap(ElInput);

const props = defineProps<setterDefaultProps>();
</script>
