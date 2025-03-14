<script setup lang="ts">
import { diagramPropertyStylePanelProvideKey } from '../../help/style-panel-provide';

const injectStylePanel = inject(diagramPropertyStylePanelProvideKey);

const form = injectStylePanel!.form;

const setNodeProperties = injectStylePanel!.setNodeProperties;
</script>

<template>
  <div class="">
    <ElFormItem label="颜色">
      <ElColorPicker
        v-model="form._cus_style.textColor"
        show-alpha
        @change="(v) => setNodeProperties('_cus_style.textColor', v!)"
      />
    </ElFormItem>
    <ElFormItem label="文字大小">
      <ElInputNumber
        v-model="form._cus_style.fontSize"
        :min="2"
        :step="1"
        @change="(v) => setNodeProperties('_cus_style.fontSize', v!)"
      />
    </ElFormItem>
    <ElFormItem label="加粗">
      <el-select
        v-model="form._cus_style.fontWeight"
        @change="(v) => setNodeProperties('_cus_style.fontWeight', v!)"
      >
        <el-option label="正常" value="normal" />
        <el-option label="加粗" value="bold" />
      </el-select>
    </ElFormItem>
    <ElFormItem label="样式">
      <el-select
        v-model="form._cus_style.fontStyle"
        @change="(v) => setNodeProperties('_cus_style.fontStyle', v!)"
      >
        <el-option label="正常" value="normal" />
        <el-option label="斜体" value="italic" />
      </el-select>
    </ElFormItem>
  </div>
</template>
