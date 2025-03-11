<script setup lang="ts">
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor-next/editor';

import { onBeforeUnmount, type PropType, ref, shallowRef } from 'vue';

import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue';
import { merge } from 'es-toolkit';
import { isNumber } from 'es-toolkit/compat';

import '@wangeditor-next/editor/dist/css/style.css';

const props = defineProps({
  editorConfig: {
    default: () => ({}),
    type: Object as PropType<IEditorConfig>,
  },
  height: {
    default: '300px',
    type: [String, Number],
  },
  toolbarConfig: {
    default: () => ({}),
    type: Object as PropType<IToolbarConfig>,
  },
});

/**
 * 外部使用 v-model 绑定值
 */
const modelValue = defineModel('modelValue', { default: '', type: String });

const mode = ref('default');

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>();

const __height = computed(() => {
  if (isNumber(props.height)) {
    return `${props.height}px`;
  }
  return props.height;
});

/** 工具栏配置 */
const __toolbarConfig = ref(merge({}, props.toolbarConfig));
/** 编辑器配置 */
const __editorConfig = ref<Partial<IEditorConfig>>(
  merge(
    {
      placeholder: '请输入内容...',
    },
    props.editorConfig,
  ),
);

/** 销毁编辑器 */
function destroy() {
  editorRef.value?.destroy();
}

/** 组件销毁时，也及时销毁编辑器 */
onBeforeUnmount(() => {
  destroy();
});

/** 编辑器创建完成 */
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};
</script>

<template>
  <div>
    <Toolbar
      :default-config="__toolbarConfig"
      :editor="editorRef"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="modelValue"
      :default-config="__editorConfig"
      :mode="mode"
      :style="{
        height: __height,
      }"
      style="overflow-y: hidden"
      @on-created="handleCreated"
    />
  </div>
</template>
