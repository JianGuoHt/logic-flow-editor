<script setup lang="ts">
import type { MiniMap } from '@logicflow/extension';

import { MapLocation } from '@element-plus/icons-vue';

import { useLf } from '#/components/hooks/useLf';

const lf = useLf();

const active = ref(false);

function handleChangeState() {
  active.value = !active.value;
  const miniMap = lf.extension.miniMap as MiniMap;

  if (active.value) {
    miniMap.show();
  } else {
    miniMap.hide();
  }
}
</script>

<template>
  <div class="tool-item">
    <div
      :class="[active ? 'is-active' : '']"
      class="tool-item-content"
      @click="handleChangeState"
    >
      <ElIcon :size="14">
        <MapLocation />
      </ElIcon>
      <div class="" style="line-height: 18px">小地图</div>
    </div>
  </div>
</template>
