<template>
    <div class="container-wrap">
        <div class="margin-top container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('margin-top')"
                @input="setValue('margin-top', $event)"
            />
        </div>
        <div class="margin-right container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('margin-right')"
                @input="setValue('margin-right', $event)"
            />
        </div>
        <div class="margin-bottom container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('margin-bottom')"
                @input="setValue('margin-bottom', $event)"
            />
        </div>
        <div class="margin-left container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('margin-left')"
                @input="setValue('margin-left', $event)"
            />
        </div>
        <div class="padding-top container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('padding-top')"
                @input="setValue('padding-top', $event)"
            />
        </div>
        <div class="padding-right container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('padding-right')"
                @input="setValue('padding-right', $event)"
            />
        </div>
        <div class="padding-bottom container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('padding-bottom')"
                @input="setValue('padding-bottom', $event)"
            />
        </div>
        <div class="padding-left container">
            <input
                type="number"
                maxlength="3"
                :value="getValue('padding-left')"
                @input="setValue('padding-left', $event)"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Applyer } from '@lego/core';
const props = defineProps<{
    applyer: Applyer;
}>();
const { applyer } = props;
const getValue = style => {
    const value = props.applyer.getter(style);
    const match = /^\d+/.exec(value);
    return (match && +match[0]) || 0;
};
const setValue = (style, event) => {
    const value = `${+event.target?.value || 0}px`;
    applyer.setter(style, value);
};
</script>
<style lang="scss" scoped>
.container-wrap {
    position: relative;
    height: 150px;
}
.container {
    position: absolute;
}
input {
    position: absolute;
    text-align: center;
    height: 20px;
    border: none;
    outline: none;
    padding: 0px;
    background-color: transparent;
}
.margin-top input {
    left: 0;
    right: 0;
    top: -20px;
    width: 100%;
}
.margin-bottom input {
    left: 0;
    right: 0;
    width: 100%;
    bottom: -20px;
}
.margin-left input {
    top: 0;
    bottom: 0;
    right: -27px;
    margin: auto;
    width: 60px;
}
.margin-right input {
    top: 0;
    bottom: 0;
    left: -11px;
    margin: auto;
    width: 60px;
}
.padding-top input {
    left: 0;
    right: 0;
    top: -20px;
    width: 100%;
}
.padding-bottom input {
    left: 0;
    right: 0;
    width: 100%;
    bottom: -20px;
}
.padding-left input {
    top: 0;
    bottom: 0;
    right: -12px;
    margin: auto;
    width: 30px;
}
.padding-right input {
    top: 0;
    bottom: 0;
    left: 2px;
    margin: auto;
    width: 30px;
}

.margin-top {
    top: 0px;
    left: 0px;
    right: 0px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #d6e4ff;
}
.margin-right {
    top: 5px;
    bottom: 5px;
    right: 0px;
    width: 0px;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
}
.margin-bottom {
    bottom: 0px;
    left: 0px;
    right: 0px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #d6e4ff;
}
.margin-left {
    top: 5px;
    bottom: 5px;
    left: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #d6e4ff;
}

.padding-top {
    top: 25px;
    left: 25px;
    right: 25px;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #d6e4ff;
}
.padding-right {
    top: 30px;
    bottom: 30px;
    right: 25px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
}
.padding-bottom {
    bottom: 25px;
    left: 25px;
    right: 25px;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #d6e4ff;
}
.padding-left {
    top: 30px;
    bottom: 30px;
    left: 25px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #d6e4ff;
}
</style>
