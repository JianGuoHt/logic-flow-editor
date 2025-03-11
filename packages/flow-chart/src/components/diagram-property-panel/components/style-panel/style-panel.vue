<script setup lang="ts">
import { getProjectSetting } from '#/components/config/project-setting';

import { diagramPropertyPanelProvideKey } from '../../help/property-panel-provide';
import BaseStylePanelItem from './base-style-panel-item.vue';
import LabelStylePanelItem from './label-style-panel-item.vue';
import PositionPanelItem from './position-panel-item.vue';
// import TextStylePanelItem from './text-style-panel-item.vue';

const projectSetting = getProjectSetting();

const injectDiagramPropertyPanel = inject(diagramPropertyPanelProvideKey);

const activeCollapseNames = ref(['base-style', 'position', 'label-style']);

const activeNode = injectDiagramPropertyPanel!.activeNodes;

/** 单选节点 */
const isSingleActiveNode = computed(() => activeNode.value.length === 1);
</script>

<template>
  <div class="style-panel h-full">
    <el-scrollbar style="height: 100%">
      <div class="pr-2">
        <el-collapse v-model="activeCollapseNames">
          <el-collapse-item
            v-if="isSingleActiveNode"
            name="position"
            title="位置"
          >
            <PositionPanelItem />
          </el-collapse-item>
          <el-collapse-item name="base-style" title="样式">
            <BaseStylePanelItem />
          </el-collapse-item>
          <el-collapse-item
            v-if="projectSetting.plugins.label"
            name="label-style"
            title="富文本"
          >
            <LabelStylePanelItem />
          </el-collapse-item>
          <!-- <el-collapse-item name="text-style" title="文字">
            <TextStylePanelItem />
          </el-collapse-item> -->
        </el-collapse>
      </div>
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
