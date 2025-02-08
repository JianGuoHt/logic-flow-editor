<script setup lang="ts">
import BaseStylePanelItem from './base-style-panel-item.vue';

const activeCollapseNames = ref(['base-style']);
</script>

<template>
  <div class="style-panel h-full">
    <el-scrollbar style="height: 100%">
      <el-collapse v-model="activeCollapseNames">
        <el-collapse-item name="base-style" title="样式">
          <BaseStylePanelItem />
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-collapse) {
  // border-top: none;
  .el-collapse-item__header {
    font-weight: bold;
  }
}
</style>
