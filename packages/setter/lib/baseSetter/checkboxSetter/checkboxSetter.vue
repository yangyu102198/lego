<template>
    <div class="checkbox-setter" :class="{ grow: config.csGrow }">
        <el-radio-group
            @update:modelValue="value => props.applyer.setter(value)"
            :modelValue="props.applyer.getter()"
            :size="config.size"
        >
            <el-radio-button
                :value="item.value"
                v-for="(item, index) in config.list"
                :key="`checkbox-setter-${index}`"
            >
                <icon
                    v-if="isIcon(item)"
                    :icon="item.label"
                    :size="getIconSize()"
                    color="#333"
                />
                <span v-else>{{ item.label }}</span>
            </el-radio-button>
        </el-radio-group>
    </div>
</template>
<script lang="ts" setup>
import { icon } from '@lego/vue-component';
import { setterDefaultProps } from '@type/setterDefaultProps';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import useConfigHook from '@/component/useConfigHook';
import './style';

const props = defineProps<setterDefaultProps>();

const isIcon = item => {
    return !(item.type && item.type != 'icon');
};
const defaultConfig: any = {
    size: 'small',
    csGrow: true
};

const config = useConfigHook(props, defaultConfig);

const getIconSize = () => {
    switch (config.value.size) {
        case 'large':
            return 24;
        case 'small':
            return 20;
    }
    return 22;
};
</script>
<style lang="scss" scoped>
.checkbox-setter.grow {
    .el-radio-group {
        display: flex;
    }

    .el-radio-button {
        flex: 1;
    }
    /deep/ .el-radio-button__inner {
        display: block;
        padding: 5px 0px !important;
    }
}
</style>
