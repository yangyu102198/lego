<template>
    <div class="checkbox-setter">
        <el-radio-group
            @update:modelValue="value => props.applyer.setter(value)"
            :modelValue="props.applyer.getter()"
            :size="getConfig(props).size || 'small'"
        >
            <el-radio-button
                :value="item.value"
                v-for="(item, index) in getList()"
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
import { getConfig } from '@utils/index';
import { setterDefaultProps } from '@type/setterDefaultProps';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import './style';

const props = defineProps<setterDefaultProps>();
const isIcon = item => {
    return !(item.type && item.type != 'icon');
};
const getIconSize = () => {
    const config = getConfig(props);
    switch (config.size) {
        case 'large':
            return 24;
        case 'small':
            return 18;
    }
    return 20;
};
const getList = () => {
    return getConfig(props).list || [];
};
</script>
