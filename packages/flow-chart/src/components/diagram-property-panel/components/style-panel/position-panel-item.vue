<script setup lang="ts">
import { useLf } from '#/components/hooks/useLf';

import { diagramPropertyStylePanelProvideKey } from '../../help/style-panel-provide';

const injectStylePanel = inject(diagramPropertyStylePanelProvideKey);
const lf = useLf();

const form = injectStylePanel!.form;

const setNodeProperties = injectStylePanel!.setNodeProperties;

function handleSetTop(zIndex: 'bottom' | 'top') {
  const { nodes } = lf.getSelectElements();

  nodes.forEach((node) => {
    lf.setElementZIndex(node.id, zIndex);
  });
}
</script>

<template>
  <div class="">
    <ElFormItem label="左侧距离">
      <ElInputNumber
        v-model="form.x"
        :step="1"
        @change="(v) => setNodeProperties('x', v)"
      />
    </ElFormItem>
    <ElFormItem label="顶部距离">
      <ElInputNumber
        v-model="form.y"
        :step="1"
        @change="(v) => setNodeProperties('y', v)"
      />
    </ElFormItem>
    <ElFormItem label="" label-width="0" size="small">
      <ElButton @click="() => handleSetTop('top')">置顶</ElButton>
      <ElButton @click="() => handleSetTop('bottom')">置底</ElButton>
    </ElFormItem>
  </div>
</template>
