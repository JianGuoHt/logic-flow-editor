<script setup lang="ts">
import type LogicFlow from '@logicflow/core';
import type { BaseNodeModel } from '@logicflow/core';

import { getProjectSetting } from '../config/project-setting';
import { useLf } from '../hooks/useLf';
import { useLfEvent } from '../hooks/useLfEvent';
import LayerPanel from './components/layer-panel/layer-panel.vue';
import StylePanel from './components/style-panel/style-panel.vue';
import { diagramPropertyPanelProvideKey } from './help/property-panel-provide';

const lf = useLf();

const { plugins, propertyPanel, toolbar } = getProjectSetting();
const isActive = ref(false);
const activePane = ref('layer');

const activeNodes = ref<LogicFlow.NodeData[]>([]);

useLfEvent('node:click', () => onLfNodeActive('node:click'));
useLfEvent('layer-tree:node-click', () => onLfNodeActive('node:click'));
useLfEvent('node:dbclick', () => onLfNodeActive('node:dbclick'));

useLfEvent('selection:selected', () => onLfNodeActive('selection:selected'));
useLfEvent('blank:click	', onLfNodeInactive);
useLfEvent('node:dnd-add', onLfNodeDndAdd);

if (plugins.label) {
  useLfEvent('label:click', (e) => {
    onLfNodeActive('label:click');

    /** 防止第二次点击label时，导致取消节点的选中。 */
    const { nodes } = lf.getSelectElements();
    if (nodes.length === 0) {
      lf.selectElementById((e.model as BaseNodeModel).id);
      setActiveNodes();
    }
  });
}

/**
 * 节点激活
 */
function onLfNodeActive(
  type: 'label:click' | 'node:click' | 'node:dbclick' | 'selection:selected',
) {
  const { nodes } = lf.getSelectElements();

  // FIXME: 或许这是一个特性，但是这里不需要这样。后续看官方的调整，持续跟进。
  /**
   * 修复连续点击不同节点的 Label节点时，不会取消上一个节点的选中状态，会导致出现类似框选的效果。
   */
  if (type === 'label:click') {
    const diffNodes = nodes.filter(
      (node) => !activeNodes.value.some((n) => n.id === node.id),
    );

    if (diffNodes && !!diffNodes[0]) {
      lf.clearSelectElements();
      lf.selectElementById(diffNodes[0].id);
    }
  }

  setActiveNodes();
}

/**
 * 节点不激活
 */
function onLfNodeInactive() {
  isActive.value = false;
}

/**
 * 节点拖拽添加
 */
function onLfNodeDndAdd() {}

/** 获取当前选中的节点  */
function setActiveNodes() {
  const { nodes } = lf.getSelectElements();

  isActive.value = nodes.length > 0;

  if (isActive.value) {
    activeNodes.value = lf.getSelectElements().nodes;
  }
}

/** 刷新激活节点 */
function refreshActiveNodes() {
  setActiveNodes();
}

provide(diagramPropertyPanelProvideKey, {
  activeNodes,
  refreshActiveNodes,
});
</script>

<template>
  <div
    :style="{
      '--property-panel-width': `${propertyPanel.width}px`,
      width: `var(--property-panel-width)`,
      height: `calc(100% - ${toolbar.height}px)`,
      top: `${toolbar.height}px`,
      zIndex: 9,
    }"
    class="diagram-property-panel is-active fixed right-0 bg-white pl-2"
  >
    <el-tabs v-model="activePane" class="h-full">
      <el-tab-pane label="图层" name="layer">
        <LayerPanel />
      </el-tab-pane>
      <el-tab-pane v-if="isActive" label="外观" name="style">
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
  // --el-color-primary: #333;

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
