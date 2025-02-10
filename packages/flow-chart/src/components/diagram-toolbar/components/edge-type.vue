<script setup lang="ts">
import {} from '@element-plus/icons-vue';

import { getEdgeConfig } from '#/components/config/edge';
import { getActiveEdgeType } from '#/components/edge/help';
import { EdgeTypeEnum } from '#/components/edge/types';
import { useLf } from '#/components/hooks/useLf';

const lf = useLf();

const edgeTypes = ref(
  getEdgeConfig().lineTypes.map((v) => {
    return {
      ...v,
      icon: shallowRef(v.icon),
    };
  }),
);

const activeEdgeType = ref(getActiveEdgeType());

const activeEdgeData = computed(() => {
  return edgeTypes.value.find((v) => v.value === activeEdgeType.value);
});

function handleEdgeType(value: EdgeTypeEnum) {
  activeEdgeType.value = value;
  const _lf = unref(lf);

  _lf?.setDefaultEdgeType(value);
}
</script>

<template>
  <div class="tool-item">
    <ElDropdown @command="handleEdgeType">
      <div class="tool-item-content">
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
