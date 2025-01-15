<template>
    <div class="test-container" style="display: inline-block">
        <span>
            <contentComp />
        </span>
    </div>
</template>

<script lang="ts" setup>
import { getProps } from './props';
import { h } from 'vue';
const props = defineProps(getProps());

const tagLists = [
    {
        name: 'mark',
        prop: 'mark'
    },
    {
        name: 'del',
        prop: 'del'
    },
    {
        name: 'u',
        prop: 'u'
    },
    {
        name: 'strong',
        prop: 'strong'
    }
];

const contentComp = () => {
    return tagLists.reduceRight((pre: any, tag) => {
        const valid = props[tag.prop];
        if (valid) {
            return h(tag.name, [pre]);
        } else {
            return pre;
        }
    }, props.textContent);
};
</script>
