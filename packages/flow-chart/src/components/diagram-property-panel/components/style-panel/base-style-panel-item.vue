<script setup lang="ts">
import type { CustomNodeCommonStyleProperty } from '#/components/types/custom-properties';

import { useLf } from '#/components/hooks/useLf';
import { getActiveNodeModelType } from '#/components/utils/node';

import { diagramPropertyPanelProvideKey } from '../../help/property-panel-provide';

const lf = useLf();

const injectDiagramPropertyPanel = inject(diagramPropertyPanelProvideKey);

const form = injectDiagramPropertyPanel!.form;

const setNodeProperties = injectDiagramPropertyPanel!.setNodeProperties;

const activeNode = injectDiagramPropertyPanel!.activeNodes;

/** 单选节点 */
const isSingleActiveNode = computed(() => activeNode.value.length === 1);

/** 选中的节点是圆形 */
const isEllipse = computed(() => {
  // eslint-disable-next-line no-unused-expressions
  activeNode.value;
  return getActiveNodeModelType(lf) === 'ellipse-node';
});
</script>

<template>
  <div class="">
    <template v-if="isSingleActiveNode">
      <ElFormItem label="宽度">
        <ElInputNumber
          v-model="form.width"
          :disabled="isEllipse"
          :min="2"
          :step="1"
          @change="(v) => setNodeProperties('width', v)"
        />
      </ElFormItem>
      <ElFormItem label="高度">
        <ElInputNumber
          v-model="form.height"
          :disabled="isEllipse"
          :min="2"
          :step="1"
          @change="(v) => setNodeProperties('height', v)"
        />
      </ElFormItem>

      <template v-if="isEllipse">
        <ElFormItem label="半径X">
          <ElInputNumber
            v-model="form.rx"
            :min="2"
            :step="1"
            @change="(v) => setNodeProperties('rx', v)"
          />
        </ElFormItem>
        <ElFormItem label="半径Y">
          <ElInputNumber
            v-model="form.ry"
            :min="2"
            :step="1"
            @change="(v) => setNodeProperties('ry', v)"
          />
        </ElFormItem>
      </template>
    </template>

    <ElFormItem label="背景色">
      <ElColorPicker
        v-model="form.backgroundColor"
        show-alpha
        @change="(v) => setNodeProperties('backgroundColor', v!)"
      />
    </ElFormItem>
    <ElFormItem label="边框颜色">
      <ElColorPicker
        v-model="form.borderColor"
        show-alpha
        @change="(v) => setNodeProperties('borderColor', v!)"
      />
    </ElFormItem>
    <ElFormItem label="边框宽度">
      <ElInputNumber
        v-model="form.borderWidth"
        :min="0"
        :step="1"
        @change="(v) => setNodeProperties('borderWidth', v)"
      />
    </ElFormItem>
    <ElFormItem label="边框类型">
      <ElSelect
        v-model="form.borderType"
        @change="
          (v: CustomNodeCommonStyleProperty['borderType']) =>
            setNodeProperties('borderType', v)
        "
      >
        <ElOption label="实线" value="solid" />
        <ElOption label="虚线" value="dashed" />
        <ElOption label="点线" value="dotted" />
      </ElSelect>
    </ElFormItem>
  </div>
</template>
