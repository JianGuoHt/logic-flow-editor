<script setup lang="ts">
import { getProjectSetting } from '../config/project-setting';
import DiagramSize from './components/diagram-size.vue';
import EdgeEndShapeType from './components/edge-end-shape-type.vue';
import EdgeType from './components/edge-type.vue';
import MiniMap from './components/mini-map.vue';
import SelectionSelectTool from './components/selection-select-tool.vue';

const projectSetting = getProjectSetting();
</script>

<template>
  <div
    :style="{
      height: `${projectSetting.toolbar.height}px`,
    }"
    class="diagram-toolbar fixed left-0 top-0 flex h-full w-full items-center justify-center gap-4 bg-white"
    style="
      z-index: 10;
      font-size: 14px;
      color: #606266;
      box-shadow: 0 2px 4px #dad7d7;
    "
  >
    <SelectionSelectTool />
    <EdgeType />
    <EdgeEndShapeType />
    <MiniMap />
    <DiagramSize />
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
      cursor: pointer;

      &.is-active {
        color: #409eff;
      }
    }

    .el-icon {
      display: flex;
    }

    .tool-item-top-text {
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>

<style lang="scss" scoped></style>
