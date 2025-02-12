<script setup lang="ts">
import type LogicFlow from '@logicflow/core';

import type {
  CustomNodeAllStyleProperty,
  CustomNodeCommonStyleProperty,
} from '../types/custom-properties';

import { isNil, omit } from 'es-toolkit';

import { getProjectSetting } from '../config/project-setting';
import { getNodeDefaultProperties } from '../help/reset-custom-properties';
import { useLf } from '../hooks/useLf';
import { useLfEvent } from '../hooks/useLfEvent';
import StylePanel from './components/style-panel/style-panel.vue';
import { diagramPropertyPanelProvideKey } from './help/property-panel-provide';

const { propertyPanel, toolbar } = getProjectSetting();

const lf = useLf();

useLfEvent('node:click', () => onLfNodeActive('node:click'));
useLfEvent('selection:selected', () => onLfNodeActive('selection:selected'));
useLfEvent('blank:click	', onLfNodeInactive);
useLfEvent('node:mousemove', onLfNodeMove);
useLfEvent('node:dnd-add', onLfNodeDndAdd);

const isActive = ref(false);
const activePane = ref('style');
const activeNodes = ref<LogicFlow.NodeData[]>([]);
const form = ref<CustomNodeAllStyleProperty>(getNodeDefaultProperties());

/**
 * 节点激活
 */
function onLfNodeActive(type: 'node:click' | 'selection:selected') {
  switch (type) {
    /**
     * 点击节点
     */
    case 'node:click': {
      isActive.value = true;
      break;
    }

    /**
     * 框选
     */
    case 'selection:selected': {
      const { edges, nodes } = lf.getSelectElements();

      if (nodes.length > 0 || edges.length > 0) {
        isActive.value = true;
      }
      break;
    }

    default: {
      isActive.value = true;
    }
  }

  if (isActive.value) {
    setActivePropertiesForm();
    activeNodes.value = lf.getSelectElements().nodes;
  }
}

/**
 * 节点不激活
 */
function onLfNodeInactive() {
  isActive.value = false;
}

/**
 * 节点移动
 */
function onLfNodeMove() {
  if (isActive.value) {
    setActivePropertiesForm();
  }
}

/**
 * 节点拖拽添加
 */
function onLfNodeDndAdd() {}

/**
 * 设置属性面板的数值
 */
function setActivePropertiesForm() {
  const { nodes } = lf.getSelectElements();
  const defaultForm = getNodeDefaultProperties();

  if (nodes.length === 0) {
    return;
  }

  if (nodes.length > 1) {
    // 框选多个节点时，属性面板全部重置为默认值
    form.value = defaultForm;
    return;
  }

  if (nodes.length === 1) {
    // 框选一个节点时，属性面板显示当前节点的属性
    const node = nodes[0];
    if (!node) {
      return;
    }

    const { properties, x, y } = node;
    // 需要忽略从属性上获取数值的属性
    const omitPropertiesKeys = [
      'x',
      'y',
    ] as (keyof CustomNodeAllStyleProperty)[];

    form.value.x = x;
    form.value.y = y;

    if (!properties) {
      // 无法获取节点属性, 属性面板重置为默认值
      form.value = omit(defaultForm, omitPropertiesKeys);
      return;
    }

    Object.keys(form.value).forEach((key) => {
      if (
        omitPropertiesKeys.includes(key as keyof CustomNodeCommonStyleProperty)
      ) {
        return;
      }

      const value = isNil(properties[key])
        ? defaultForm[key as keyof CustomNodeCommonStyleProperty] || null
        : properties[key];

      Reflect.set(form.value, key, value);
    });
  }
}

/**
 * 设置激活节点属性
 * @param key
 * @param value
 */
function setNodeProperties<K extends keyof CustomNodeAllStyleProperty>(
  key: K,
  value: CustomNodeAllStyleProperty[K],
) {
  const { nodes } = lf.getSelectElements();

  nodes.forEach((node) => {
    lf.setProperties(node.id, {
      [key]: value,
    });

    // 处理特殊属性
    if (key === 'x' || key === 'y') {
      const nodeModel = lf.getNodeModelById(node.id);
      let _value = Number(value);

      if (nodeModel && !Number.isNaN(_value)) {
        if (key === 'x') {
          _value = isNil(_value) ? node.x : _value;
          nodeModel.moveTo(_value, node.y);
        }
        if (key === 'y' && !Number.isNaN(_value)) {
          _value = isNil(_value) ? node.y : _value;
          nodeModel.moveTo(node.x, _value);
        }
      }
    }

    setActivePropertiesForm();
  });
}

provide(diagramPropertyPanelProvideKey, {
  activeNodes,
  form,
  setNodeProperties,
});
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
    class="diagram-property-panel fixed right-0 bg-white pl-2"
  >
    <ElForm
      :model="form"
      class="h-full"
      label-position="left"
      label-width="90px"
    >
      <el-tabs v-model="activePane" class="h-full">
        <el-tab-pane label="外观" name="style">
          <StylePanel />
        </el-tab-pane>
      </el-tabs>
    </ElForm>
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
