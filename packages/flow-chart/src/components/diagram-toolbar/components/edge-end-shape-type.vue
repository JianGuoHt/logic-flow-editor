<script setup lang="ts">
import {} from '@element-plus/icons-vue';

import { getEdgeConfig } from '#/components/config/edge';
import { EDGE_END_SHAPE_TYPE_STORAGE_KEY } from '#/components/edge/help/constant';
import { getActiveEdgeEndShapeType } from '#/components/edge/help/end-shape-style';
import { EdgeArrowTypeEnum } from '#/components/edge/types';

const edgeTypes = ref(
  getEdgeConfig().lineEndArrowTypes.map((v) => {
    return {
      ...v,
      icon: shallowRef(v.icon),
    };
  }),
);

const activeShapeType = ref(getActiveEdgeEndShapeType());

const activeEdgeData = computed(() => {
  return edgeTypes.value.find((v) => v.value === activeShapeType.value);
});

function handleEdgeType(value: EdgeArrowTypeEnum) {
  activeShapeType.value = value;

  localStorage.setItem(EDGE_END_SHAPE_TYPE_STORAGE_KEY, value);
}
</script>

<template>
  <div class="tool-item">
    <ElDropdown @command="handleEdgeType">
      <div class="tool-item-content" style="width: 50px">
        <ElIcon :size="14">
          <component :is="activeEdgeData?.icon" />
        </ElIcon>
        <div class="" style="line-height: 18px">
          {{ activeEdgeData?.label }}
        </div>
      </div>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem
            v-for="item in edgeTypes"
            :key="item.value"
            :command="item.value"
          >
            <ElIcon>
              <component :is="item.icon" />
            </ElIcon>
            {{ item.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
