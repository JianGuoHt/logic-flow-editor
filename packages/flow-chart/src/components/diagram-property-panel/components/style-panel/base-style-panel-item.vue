<script setup lang="ts">
import type LogicFlow from '@logicflow/core';

import type { CustomNodeProperty } from '#/components/types/custom-properties';

import { isNil } from 'lodash-es';

import { useLf } from '#/components/hooks/useLf';
import { useLfActiveNodes } from '#/components/hooks/useLfActiveNode';

import { getNodeCustomDefaultProperties } from '../../../help/reset-custom-properties';

const lf = useLf();
const activeNode = useLfActiveNodes(onLfNodeActive);

const form = ref<CustomNodeProperty>(getNodeCustomDefaultProperties());

/**
 * 节点激活 回调
 * @param nodes
 */
function onLfNodeActive(nodes: LogicFlow.NodeData[]) {
  const defaultForm = getNodeCustomDefaultProperties();

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
    const nodeProperties = nodes[0]?.properties;

    if (!nodeProperties) {
      // 无法获取节点属性, 属性面板重置为默认值
      form.value = defaultForm;
      return;
    }

    Object.keys(form.value).forEach((key) => {
      const value = isNil(nodeProperties[key])
        ? defaultForm[key as keyof CustomNodeProperty] || null
        : nodeProperties[key];

      Reflect.set(form.value, key, value);
    });
  }
}

/**
 * 更换背景色
 * @param color
 */
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
