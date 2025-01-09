<template>
    <div
        class="monaco"
        style="min-height: 100px; border: 1px solid #ddd"
        ref="monacoReg"
    ></div>
</template>
<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import { ref, onMounted, defineProps, watchEffect, onBeforeUnmount } from 'vue';
import { Applyer } from '@lego/core';
const props = defineProps<{
    setterConfig: Record<string, any>;
    applyer: Applyer;
}>();
const monacoReg = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor;
if (!self.MonacoEnvironment) {
    self.MonacoEnvironment = {
        getWorker(_, __) {
            return cssWorker();
        }
    };
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}

const init = () => {
    editor = monaco.editor.create(monacoReg.value!, {
        value: props.applyer.getter() as string,
        language: 'css',
        automaticLayout: true, // 自动布局
        minimap: {
            // 关闭小地图
            enabled: false
        },
        tabSize: 2
    });
    editor.onDidBlurEditorWidget(() => setValue());
    watchEffect(() => {
        const value = props.applyer.getter() as string;
        editor.setValue(value);
    });
};

const setValue = () => {
    let content = editor.getValue();

    // 获取所有的 CSS 错误标记
    const markers = monaco.editor.getModelMarkers({
        owner: 'css',
        resource: editor.getModel()!.uri
    });

    // 如果有错误标记
    if (markers.length > 0) {
        const errorLines = new Set();
        markers.forEach(marker => {
            errorLines.add(marker.startLineNumber);
        });

        const lines = content.split('\n');
        const cleanedLines = lines.filter(
            (_, index) => !errorLines.has(index + 1)
        );
        content = cleanedLines.join('\n');
    }
    props.applyer.setter(content);
};

onMounted(() => {
    init();
});
onBeforeUnmount(() => {
    if (editor) {
        editor.dispose();
    }
});
</script>
