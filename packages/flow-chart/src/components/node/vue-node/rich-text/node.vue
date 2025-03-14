<script setup lang="ts">
import type { MenuItem } from '@logicflow/extension';
import type { VueNodeModel } from '@logicflow/vue-node-registry';

import type { CustomNodeProperty } from '#/components/types/custom-properties';

import type { StyleValue } from 'vue';

import { EventType, type GraphModel } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';
import { useRichEditorDialog } from '#/components/hooks/useRichEditorDialog';

const richEditorDialog = useRichEditorDialog();

const getNode = inject('getNode') as () => VueNodeModel<
  { _cus_html: string } & CustomNodeProperty
>;
const getGraph = inject('getGraph') as () => GraphModel;
const nodeModel = getNode();
const graphModel = getGraph();

const nodeStyle = ref();
const htmlStr = ref('');

function initNodeData() {
  nodeModel.height = 80;
  nodeModel.width = 140;
  nodeModel.resizable = true;

  nodeModel.setProperties(
    merge(
      {
        ...getNodeCustomDefaultProperties(),
        _cus_html: '<p style="font-size: 12px">请单击右键已编辑内容。</p>',
        _cus_layer: { name: '请单击右键已编辑内容。' },
        height: 80,
        width: 140,
      },
      nodeModel.getProperties() || {},
    ),
  );

  setNodeHtml(nodeModel.getProperties()._cus_html || '');
}

/** 获取节点样式 */
function getNodeStyle() {
  const properties = nodeModel.getProperties();
  const style = {
    ...properties._cus_style,
    height: `${properties.height}px`,
    width: `${properties.width}px`,
  } as StyleValue;

  return style;
}

/** 设置节点html */
function setNodeHtml(html: string, setProperties = false) {
  htmlStr.value = html;
  setProperties &&
    nodeModel.setProperties({
      _cus_html: html,
    });
}

/** 设置右键菜单 */
function setMenu(model: VueNodeModel) {
  model.menu = [
    {
      callback: (node) => {
        graphModel.deleteNode(node.id);
      },
      text: '删除',
    },
    {
      callback: (node) => {
        richEditorDialog.open(
          node.properties._cus_html || '',
          (html: string) => {
            setNodeHtml(html, true);
          },
        );
      },
      text: '编辑',
    },
  ] as MenuItem[];
}

onMounted(() => {
  graphModel.eventCenter.on(EventType.NODE_PROPERTIES_CHANGE, (eventData) => {
    const keys = eventData.keys as string[];

    if (eventData.id === nodeModel.id) {
      nodeStyle.value = getNodeStyle();

      if (keys.includes('_cus_html')) {
        setNodeHtml(nodeModel.getProperties()._cus_html || '');
      }
    }
  });

  nodeModel.setAttributes = function () {
    setMenu(this);
  };

  initNodeData();
});
</script>

<template>
  <div :style="nodeStyle">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="px-1" v-html="htmlStr"></div>
  </div>
</template>
