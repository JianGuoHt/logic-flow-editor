<script setup lang="ts">
import type { CustomNodeProperty } from '#/components/types/custom-properties';
import type { DeepObjectKeys } from '#/components/types/help';

import { isNil, merge } from 'es-toolkit';
import { set, toPath } from 'es-toolkit/compat';

import { getProjectSetting } from '#/components/config/project-setting';
import { getNodeDefaultProperties } from '#/components/help/reset-custom-properties';
import { useLf } from '#/components/hooks/useLf';
import { useLfEvent } from '#/components/hooks/useLfEvent';

import { diagramPropertyPanelProvideKey } from '../../help/property-panel-provide';
import { diagramPropertyStylePanelProvideKey } from '../../help/style-panel-provide';
import BaseStylePanelItem from './base-style-panel-item.vue';
import LabelStylePanelItem from './label-style-panel-item.vue';
import PositionPanelItem from './position-panel-item.vue';
// import TextStylePanelItem from './text-style-panel-item.vue';

const projectSetting = getProjectSetting();

const injectDiagramPropertyPanel = inject(diagramPropertyPanelProvideKey);

const { activeNodes } = injectDiagramPropertyPanel!;

useLfEvent('node:mousemove', () => {
  setActivePropertiesForm();
});

const activeCollapseNames = ref(['base-style', 'position', 'label-style']);

const lf = useLf();

const form = ref<CustomNodeProperty>(getNodeDefaultProperties());

/** 单选节点 */
const isSingleActiveNode = computed(() => activeNodes.value.length === 1);

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

    // 无法获取节点属性, 属性面板重置为默认值
    form.value = properties ? merge(defaultForm, properties) : defaultForm;

    form.value.x = x;
    form.value.y = y;
  }
}

/**
 * 设置激活节点属性
 * @param key
 * @param value
 */
function setNodeProperties(
  key: DeepObjectKeys<CustomNodeProperty>,
  value: any,
) {
  const { nodes } = lf.getSelectElements();

  nodes.forEach((node) => {
    const preProperties = lf.getProperties(node.id);
    const properties = {} as Record<string, any>;

    const path = toPath(key);

    if (path.length > 1 && path[0] && preProperties) {
      properties[path[0]] = preProperties[path[0]];
    }

    set(properties, key, value);

    lf.setProperties(node.id, properties);

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

watch(
  () => activeNodes.value,
  () => {
    setActivePropertiesForm();
  },
  {
    immediate: true,
  },
);

provide(diagramPropertyStylePanelProvideKey, {
  form,
  setNodeProperties,
});
</script>

<template>
  <div class="style-panel h-full">
    <el-scrollbar style="height: 100%">
      <ElForm
        :model="form"
        class="h-full"
        label-position="left"
        label-width="90px"
      >
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
      </ElForm>
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
