<script setup lang="ts">
import type LogicFlow from '@logicflow/core';

import { ElDialog, ElMessageBox } from 'element-plus';

import { WangEditor } from '#/components/components/wang-editor';
import { lfProvideKey } from '#/components/types/lf-token';

import { diagramPropertyPanelProvideKey } from '../../help/property-panel-provide';

type CusLabelNode = {
  _cus_nodeId: string;
} & LogicFlow.LabelConfig;

const injectDiagramPropertyPanel = inject(diagramPropertyPanelProvideKey);
const lfInstance = inject(lfProvideKey);

const { activeNodes } = injectDiagramPropertyPanel!;
const { lf } = lfInstance!;

const labelDialogOptions = reactive({
  form: {
    content: '',
  },
  labelNode: {} as CusLabelNode,
  nodeId: '' as string,
  visible: false,
});

const labelNodes = computed(() => {
  const _labelNodes = [] as CusLabelNode[];

  activeNodes.value.forEach((nodeItem) => {
    const _label = nodeItem.properties?._label as CusLabelNode[];

    if (_label) {
      _labelNodes.push(
        ..._label.map((labelItem) => ({
          ...labelItem,
          _cus_nodeId: nodeItem.id!,
        })),
      );
    }
  });

  return _labelNodes;
});

function handleUpdateLabel(value: CusLabelNode) {
  labelDialogOptions.form.content = value.content || '';
  labelDialogOptions.nodeId = value._cus_nodeId;
  labelDialogOptions.labelNode = value;
  labelDialogOptions.visible = true;
}

/** 获取当前激活节点的label */
function getActiveNodeLabels(nodeId?: string) {
  if (!nodeId) {
    return;
  }

  const properties = lf.value?.getProperties(nodeId);

  const _label = properties?._label as LogicFlow.LabelConfig[] | undefined;

  return _label;
}

/** 删除 */
function handleDeleteLabel(value: CusLabelNode) {
  ElMessageBox.confirm('确认删除?', '提示', {
    type: 'warning',
  }).then(() => {
    const _label = getActiveNodeLabels(value._cus_nodeId);

    if (!_label) {
      return;
    }

    const delLabel = _label.find((v) => v.id === value.id);
    const submitLabel = _label.filter((v) => v.id !== value.id);

    if (!delLabel) {
      return;
    }

    // lf.value?.deleteElement(delLabel.id!);
    lf.value?.setProperties(value._cus_nodeId, {
      _label: submitLabel,
    });

    injectDiagramPropertyPanel?.refreshActiveNodes();
  });
}

/** 保存修改 */
function handleSubmitLabel() {
  const nodeData = lf.value?.getNodeDataById(labelDialogOptions.nodeId);
  if (!nodeData) {
    return;
  }

  const { properties } = nodeData;

  const _label = properties?._label as LogicFlow.LabelConfig[] | undefined;

  if (!_label) {
    return;
  }

  const editLabel = _label.map((v) => ({
    ...v,
    content:
      v.id === labelDialogOptions.labelNode.id
        ? labelDialogOptions.form.content
        : v.content,
    editable: false,
  }));

  lf.value?.setProperties(labelDialogOptions.nodeId, {
    _label: editLabel,
  });

  injectDiagramPropertyPanel?.refreshActiveNodes();

  labelDialogOptions.visible = false;
}
</script>

<template>
  <div class="">
    <ElDialog
      v-model="labelDialogOptions.visible"
      show-close
      title="修改富文本内容"
    >
      <WangEditor v-model="labelDialogOptions.form.content" :height="400" />

      <template #footer>
        <ElButton @click="labelDialogOptions.visible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSubmitLabel"> 保存 </ElButton>
      </template>
    </ElDialog>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-for="item in labelNodes"
      :key="item.id"
      class="border-b border-solid"
    >
      <div v-html="item.content"></div>
      <div class="flex justify-end">
        <ElButton
          class="px-1"
          size="small"
          text
          type="primary"
          @click="handleUpdateLabel(item)"
        >
          修改
        </ElButton>
        <ElButton
          class="!ml-1 px-1"
          size="small"
          text
          type="danger"
          @click="handleDeleteLabel(item)"
        >
          删除
        </ElButton>
      </div>
    </div>
  </div>
</template>
