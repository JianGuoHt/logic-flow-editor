<script setup lang="ts">
import { diagramPropertyPanelProvideKey } from '../../help/property-panel-provide';

const injectDiagramPropertyPanel = inject(diagramPropertyPanelProvideKey);

const form = injectDiagramPropertyPanel!.form;

const setNodeProperties = injectDiagramPropertyPanel!.setNodeProperties;
</script>

<template>
  <div class="">
    <ElFormItem label="颜色">
      <ElColorPicker
        v-model="form.textColor"
        show-alpha
        @change="(v) => setNodeProperties('textColor', v!)"
      />
    </ElFormItem>
    <ElFormItem label="文字大小">
      <ElInputNumber
        v-model="form.fontSize"
        :min="2"
        :step="1"
        @change="(v) => setNodeProperties('fontSize', v!)"
      />
    </ElFormItem>
    <ElFormItem label="加粗">
      <el-select
        v-model="form.fontWeight"
        @change="(v) => setNodeProperties('fontWeight', v!)"
      >
        <el-option label="正常" value="normal" />
        <el-option label="加粗" value="bold" />
      </el-select>
    </ElFormItem>
    <ElFormItem label="样式">
      <el-select
        v-model="form.fontStyle"
        @change="(v) => setNodeProperties('fontStyle', v!)"
      >
        <el-option label="正常" value="normal" />
        <el-option label="斜体" value="italic" />
      </el-select>
    </ElFormItem>
  </div>
</template>
