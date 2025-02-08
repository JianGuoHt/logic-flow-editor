<script setup lang="ts">
import { getProjectSetting } from '../config/project-setting';
import { useLfEvent } from '../hooks/useLfEvent';
import StylePanel from './components/style-panel/style-panel.vue';

const { propertyPanel, toolbar } = getProjectSetting();

const isActive = ref(false);
const activePane = ref('style');

useLfEvent('node:click', onLfNodeActive);
useLfEvent('blank:click	', onLfNodeInactive);

/**
 * 点击节点
 */
function onLfNodeActive() {
  isActive.value = true;
}

/**
 * 点击空白
 */
function onLfNodeInactive() {
  isActive.value = false;
}
</script>

<template>
  <div
    :class="[isActive ? 'is-active' : '']"
    :style="{
      '--property-panel-width': `${propertyPanel.width}px`,
      width: `var(--property-panel-width)`,
      height: `calc(100% - ${toolbar.height}px)`,
      top: `${toolbar.height}px`,
      zIndex: 9,
    }"
    class="diagram-property-panel fixed right-0 bg-white px-2"
  >
    <el-tabs v-model="activePane" class="h-full">
      <el-tab-pane label="外观" name="style">
        <StylePanel />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.diagram-property-panel {
  right: calc(-1 * var(--property-panel-width));
  box-shadow: 0 2px 4px #dad7d7;
  transition: right 0.3s;

  &.is-active {
    right: 0;
  }
}

::v-deep(.el-tabs) {
  --el-color-primary: #333;

  .el-tabs__header .el-tabs__item {
    padding: 0 10px;

    &.is-active {
      font-weight: bold;
    }
  }

  .el-tab-pane {
    height: 99%;
  }
}
</style>
