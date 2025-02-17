<script setup lang="ts">
import type { VueNodeModel } from '@logicflow/vue-node-registry';

const percentage = ref(80);
const getNode = inject('getNode') as () => VueNodeModel;
const nodeModel = getNode();

function initNodeData() {
  nodeModel.width = 80;
  nodeModel.height = 80;
  nodeModel.resizable = false;
  nodeModel.text.editable = false;
}

onMounted(() => {
  initNodeData();
});
</script>

<template>
  <el-progress :percentage="percentage" :width="80" type="dashboard" />
</template>
