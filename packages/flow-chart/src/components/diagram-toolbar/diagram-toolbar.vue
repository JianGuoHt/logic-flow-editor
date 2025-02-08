<script setup lang="ts">
import { getProjectSetting } from '../config/project-setting';
import EdgeEndShapeType from './components/edge-end-shape-type.vue';
import EdgeType from './components/edge-type.vue';

const projectSetting = getProjectSetting();
</script>

<template>
  <div
    :style="{
      height: `${projectSetting.toolbar.height}px`,
    }"
    class="diagram-toolbar fixed left-0 top-0 flex h-full w-full items-center justify-center gap-3 bg-white"
    style="
      z-index: 10;
      font-size: 14px;
      color: #606266;
      box-shadow: 0 2px 4px #dad7d7;
    "
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
