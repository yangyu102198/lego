<template>
    <div class="monaco" ref="monacoReg"></div>
</template>
<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import { ref, onMounted, defineProps, watch } from 'vue';
import { Applyer } from '../types/setter';
const props = defineProps<{
    setterConfig: Record<string, any>;
    applyer: Applyer;
}>();
const monacoReg = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor;
const init = () => {
    editor = monaco.editor.create(monacoReg.value!, {
        value: props.applyer.getter() as string,
        language: props.setterConfig.language,
        minimap: {
            // 关闭小地图
            enabled: false
        },
        tabSize: 2
    });
    editor.onDidChangeModelContent(_ => {
        props.applyer.setter(editor.getValue());
    });
};
watch(
    () => props.applyer.getter() as string,
    value => {
        editor.setValue(value);
    }
);
onMounted(() => {
    init();
    console.log(editor);
});
</script>
