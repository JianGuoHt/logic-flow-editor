<script setup lang="ts">
import type LogicFlow from '@logicflow/core';
import type { InputInstance, TreeInstance } from 'element-plus';

import { Operation } from '@element-plus/icons-vue';
import { onClickOutside } from '@vueuse/core';
import { sortBy } from 'es-toolkit';
import { eachTree } from 'xe-utils';

import { useLf } from '#/components/hooks/useLf';
import { useLfEvent } from '#/components/hooks/useLfEvent';
import { useRichEditorDialog } from '#/components/hooks/useRichEditorDialog';
import { richText } from '#/components/node/vue-node';

type nodeTreeItem = {
  __inputRef?: InputInstance | null;
  __isEditing: boolean;
  children: nodeTreeItem[];
  data: LogicFlow.NodeData;
  id: string;
  label: string;
};

const lf = useLf();
const richEditorDialog = useRichEditorDialog();

const outsideTriggerRef = ref();
const treeRef = ref<TreeInstance>();

let nodes: LogicFlow.NodeData[] = [];
const nodesTree = ref<nodeTreeItem[]>([]);

/** 设置节点树 */
function setTreeNodes() {
  nodes = lf.getGraphRawData().nodes;

  nodesTree.value = sortBy(
    nodes.map((node) => ({
      __inputRef: null,
      __isEditing: false,
      data: node,
      id: node.id,
      label: node.properties?._cus_layer?.name || node.type,
      children: [],
    })),
    [(v) => v.data.zIndex],
  ).reverse();
}

/** 校验是否允许拖拽 */
function checkAllowDrop(_draggingNode: any, _dropNode: any, type: string) {
  if (type === 'inner') {
    return false;
  }
  return true;
}

/** 清除编辑 */
function clearEditing() {
  eachTree(nodesTree.value, (node) => {
    node.__isEditing = false;
  });
}

/** 节点拖拽完成 */
function onTreeNodeDrop() {
  nodesTree.value.forEach((node, index) => {
    const zIndex = nodesTree.value.length - index;

    lf.setElementZIndex(node.id, zIndex);
  });
}

/** 节点点击 */
function handleTreeNodeClick(node: nodeTreeItem) {
  const nodeModel = lf.getNodeModelById(node.id);

  lf.clearSelectElements();
  nodeModel?.setSelected(true);
  lf.graphModel.eventCenter.emit('layer-tree:node-click', {
    data: nodeModel?.getData(),
  });
}

/** 删除节点 */
function handleDeleteNode(node: nodeTreeItem) {
  lf.deleteNode(node.id);
}

/** 编辑节点文本 */
function handleEditNodeLabel(node: nodeTreeItem) {
  const graphModel = lf.getModelById(node.id);

  richEditorDialog.open(
    node.data.properties?._cus_html || '',
    (html: string) => {
      // 解析html中的文本
      const text = html.replaceAll(/<[^>]*>/g, '').trim();

      graphModel?.setProperties({
        _cus_html: html,
        _cus_layer: { name: text.slice(0, 20) },
      });
    },
  );
}

/** 节点双击 */
function handleNodeDoubleClick(data: nodeTreeItem) {
  clearEditing();
  data.__isEditing = true;

  nextTick(() => {
    outsideTriggerRef.value = data.__inputRef?.ref;
    data.__inputRef?.focus();
  });
}

useLfEvent('graph:updated', () => {
  setTreeNodes();
});

useLfEvent('node:properties-change', (e) => {
  if (e.keys.includes('_cus_layer')) {
    setTreeNodes();
  }
});

useLfEvent('node:click', (e) => {
  treeRef.value?.setCurrentKey(e.data.id);
});

useLfEvent('blank:click', () => {
  treeRef.value?.setCurrentKey();
});

/** 点击外部清除编辑,并保存 */
onClickOutside(outsideTriggerRef, () => {
  const activeTreeNodeData = treeRef.value?.getCurrentNode();

  if (!activeTreeNodeData) {
    return;
  }

  lf.setProperties(activeTreeNodeData.id, {
    _cus_layer: {
      name: activeTreeNodeData.label,
    },
  });

  clearEditing();
  outsideTriggerRef.value = null;
});
</script>

<template>
  <div class="layer-panel h-full pr-2">
    <el-scrollbar style="height: 100%">
      <ElTree
        ref="treeRef"
        :allow-drop="checkAllowDrop"
        :data="nodesTree"
        draggable
        highlight-current
        node-key="id"
        @node-click="handleTreeNodeClick"
        @node-drop="onTreeNodeDrop"
      >
        <template #default="{ node, data }">
          <div class="flex flex-1 items-center overflow-hidden">
            <div
              class="flex-1 truncate"
              @dblclick="() => handleNodeDoubleClick(data)"
            >
              <ElInput
                v-if="data.__isEditing"
                :ref="(e) => (data.__inputRef = e)"
                v-model="data.label"
                size="small"
              />
              <span v-else>{{ node.label }}</span>
            </div>
            <div class="flex h-full items-center">
              <ElDropdown
                :persistent="false"
                placement="left-start"
                trigger="click"
              >
                <div class="px-1">
                  <ElIcon>
                    <Operation />
                  </ElIcon>
                </div>

                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem @click="handleDeleteNode(data)">
                      <el-text type="danger">删除</el-text>
                    </ElDropdownItem>
                    <ElDropdownItem
                      v-if="data.data.type === richText.type"
                      @click="handleEditNodeLabel(data)"
                    >
                      编辑文本
                    </ElDropdownItem>
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
            </div>
          </div>
        </template>
      </ElTree>
    </el-scrollbar>
  </div>
</template>
