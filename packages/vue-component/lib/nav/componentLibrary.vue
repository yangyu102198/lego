<template>
    <div class="main">
        <div
            v-for="(item, index) in RD.componentList"
            :key="`component${index}`"
            draggable="true"
            @dragstart="event => handlerDrag(event, item)"
        >
            {{ item.alias }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowReactive, onBeforeMount, onUnmounted } from 'vue';
import { type Engin, MeterialMeta, ComponentMeterialMeta } from '@lego/core';

const props = defineProps<{
    engin: Engin;
}>();

const { engin } = props;
const RD = shallowReactive<{
    componentList: MeterialMeta[];
}>({
    componentList: []
});
const untap = engin.hooks.meterialRegisterFinish.tap(getComponentList);

function getComponentList() {
    RD.componentList = engin.meterialManager
        .getMeterialByType('component')
        .filter(meterial => {
            return !(
                (meterial as ComponentMeterialMeta).componentEditConfig
                    ?.showInNav === false
            );
        });
}
const handlerDrag = (_, nav) => {
    const tempNode = engin.treeNodeManager.createTempTreeNode(nav.name);
    (window as any).__tmpLayoutData = {
        layout: {
            target: nav.componentLayoutType,
            id: tempNode.id
        }
    };
};
onBeforeMount(getComponentList);
onUnmounted(untap);
</script>
