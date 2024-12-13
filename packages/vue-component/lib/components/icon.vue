<template>
    <el-icon :size="size" :color="color">
        <svg v-if="local" aria-hidden="true">
            <use :xlink:href="symbolId" />
        </svg>
        <span v-else class="iconify" :data-icon="symbolId"></span>
    </el-icon>
</template>
<script lang="ts" setup name="icon">
import '@iconify/iconify';
import { computed } from 'vue';
import { ElIcon } from 'element-plus';

interface Props {
    icon?: string;
    color?: string;
    size?: number;
    local?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    icon: '',
    color: '',
    size: 20,
    local: false
});

// 生成id
const symbolId = computed(() => {
    let match = props.icon.match(/^([^:]*):(.*)/);
    let dir = match ? match[1] : '';
    let name = match ? match[2] : props.icon;
    let id = `#icon${dir ? '-' + dir : ''}-${name}`;
    return props.local ? id : props.icon;
});
</script>
