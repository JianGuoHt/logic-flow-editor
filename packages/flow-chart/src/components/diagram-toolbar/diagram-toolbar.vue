<script setup lang="ts">
import EdgeEndShapeType from './components/edge-end-shape-type.vue';
import EdgeType from './components/edge-type.vue';
</script>

<template>
  <div
    class="diagram-toolbar flex h-full items-center justify-center gap-3"
    style="font-size: 14px; color: #606266"
  >
    <EdgeType />
    <EdgeEndShapeType />
  </div>
</template>

<style lang="scss">
.diagram-toolbar {
  .tool-item {
    .tool-item-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .el-icon {
      display: flex;
    }
  }
}
</style>

<style lang="scss" scoped></style>
