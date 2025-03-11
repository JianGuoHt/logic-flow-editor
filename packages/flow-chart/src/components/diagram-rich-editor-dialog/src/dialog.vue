<script setup lang="ts">
import { WangEditor } from '#/components/components/wang-editor';

const dialogOptions = reactive({
  form: {
    content: '',
  },
  visible: false,
});

let successCallback: (html: string) => void;

function handleSubmit() {
  successCallback && successCallback(dialogOptions.form.content);
  close();
}

function handleClose() {
  close();
}

function open(html: string, callback: (html: string) => void) {
  successCallback = callback;
  dialogOptions.form.content = html || '';
  dialogOptions.visible = true;
}

function close() {
  dialogOptions.form.content = '';
  dialogOptions.visible = false;
}

defineExpose({
  close,
  open,
});
</script>

<template>
  <ElDialog v-model="dialogOptions.visible" show-close title="修改富文本内容">
    <WangEditor
      v-if="dialogOptions.visible"
      v-model="dialogOptions.form.content"
      :height="400"
    />

    <template #footer>
      <ElButton @click="handleClose">取消</ElButton>
      <ElButton type="primary" @click="handleSubmit"> 保存 </ElButton>
    </template>
  </ElDialog>
</template>
