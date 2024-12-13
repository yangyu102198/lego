<template>
    <div :class="resolveCssname('nav-wrap')">
        <div class="nav-wrap__container">
            <div class="icons">
                <div
                    class="icons__item"
                    :key="`${item.id}-${index}`"
                    @click="reactiveDate.activeNav = item.id"
                    v-for="(item, index) in getRenderNav()"
                >
                    <icon
                        :icon="item.icon"
                        :color="
                            item.id == reactiveDate.activeNav ? '#409efc' : ''
                        "
                    ></icon>
                </div>
            </div>
        </div>
        <div
            v-if="!!reactiveDate.activeNav"
            :class="[
                'icons-item__component--actived',
                ,
                checkIsfix() ? 'fix' : 'unfix'
            ]"
        >
            <div class="component__header">
                <span>{{ getActiveNav().name }}</span>
            </div>
            <component
                :is="getActiveNav().component"
                :engin="props.engin"
            ></component>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type Component, defineAsyncComponent, reactive } from 'vue';
import { resolveCssname } from '../utils/helper';
import icon from '@/components/icon.vue';
import { type Engin } from '@lego/core';

type NavMeta = {
    name: string;
    id: string;
    icon: string;
    component: Component;
};
type FilterFn = (navs: NavMeta[]) => NavMeta[] | [];

const reactiveDate = reactive<{
    activeNav: string | null;
    cacheNavdata: any;
}>({
    activeNav: null,
    cacheNavdata: {}
});
const props = defineProps<{
    filterNav?: string[] | FilterFn;
    extendsNav?: NavMeta[];
    engin: Engin;
}>();
const defaultNav: NavMeta[] = [
    {
        id: 'general',
        name: '大纲',
        icon: 'material-symbols-light:lan-outline',
        component: defineAsyncComponent(() => import('./componentLibrary.vue'))
    },
    {
        id: 'components',
        name: '组件库',
        icon: 'mi:layers',
        component: defineAsyncComponent(() => import('./componentLibrary.vue'))
    }
];
const getRenderNav = () => {
    let renderNavs: NavMeta[] = [...defaultNav];

    if (props.filterNav) {
        if (typeof props.filterNav == 'function') {
            renderNavs = props.filterNav([...defaultNav]);
        } else {
            renderNavs = renderNavs.filter(nav => {
                return !(props.filterNav as string[]).includes(nav.id);
            });
        }
    }
    if (props.extendsNav) {
        renderNavs = [...renderNavs, ...props.extendsNav];
    }
    return renderNavs;
};
const getActiveNav = () => {
    return getRenderNav().find(nav => nav.id == reactiveDate.activeNav)!;
};
const checkIsfix = () => {
    let { activeNav } = reactiveDate;
    let activeNavCache = reactiveDate.cacheNavdata[activeNav!];
    if (activeNavCache) {
        return !!activeNavCache.fix;
    }
};
</script>
