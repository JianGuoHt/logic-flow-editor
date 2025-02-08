<script setup lang="ts">
import { useLf } from '#/components/hooks/useLf';
import { useLfActiveNodes } from '#/components/hooks/useLfActiveNode';

const lf = useLf();
const activeNode = useLfActiveNodes();

const form = ref({
  backgroundColor: '#fff',
});

function handleBackgroundColorChange(color: null | string) {
  activeNode.value.forEach((node) => {
    lf.setProperties(node.id, {
      backgroundColor: color,
    });
  });
}
</script>

<template>
  <div class="base-style-panel-item">
    <ElForm :model="form" label-position="left" label-width="90px">
      <ElFormItem label="背景色">
        <ElColorPicker
          v-model="form.backgroundColor"
          show-alpha
          @change="handleBackgroundColorChange"
        />
      </ElFormItem>
    </ElForm>
  </div>
</template>
