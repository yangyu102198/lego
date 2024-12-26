<template>
    <div class="edit-main">
        <div class="header"></div>
        <div class="body" v-if="loading"></div>
        <div class="body" v-else>
            <div class="body__left">
                <navComponent :engin="engin"></navComponent>
            </div>

            <div class="body__center">
                <div class="body-center__container">
                    <editPanel :engin="engin"></editPanel>
                </div>
            </div>
            <div class="body__right">
                <div class="boxy-right__container">
                    <activeEditorPanel :engin="engin"></activeEditorPanel>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import navComponent from '@lego/vue-component/nav';
import editPanel from '@lego/vue-component/editPanel';
import activeEditorPanel from '@lego/vue-component/activeEditorPanel';

import { ref, reactive } from 'vue';
import { getEngin, getMetrial } from '@/engin';
const loading = ref(true);
const engin = getEngin();

const init = async () => {
    await engin.init();
    await engin.meterialManager.register(getMetrial());
    // 激活treeNodeManager
    engin.treeNodeManager.treeNodeContainer = reactive(
        engin.treeNodeManager.treeNodeContainer
    ) as typeof engin.treeNodeManager.treeNodeContainer;
    engin.treeNodeManager.createRootTreeNode();
    loading.value = false;
};
init();
</script>
