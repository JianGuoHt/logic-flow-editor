<script setup lang="ts">
import type { EventArgs } from '@logicflow/core';

import { Minus, Plus } from '@element-plus/icons-vue';
import { useEventListener } from '@vueuse/core';
import { Decimal } from 'decimal.js';
import { debounce } from 'es-toolkit';

import { useLf } from '#/components/hooks/useLf';
import { useLfEvent } from '#/components/hooks/useLfEvent';

const ZOOM_STEP = 0.1;

const lf = useLf();
const zoomSize = ref(100);
const zoomCenter = ref<[number, number]>([0, 0]);

useLfEvent('graph:transform', onLfTransform);
useEventListener(window, 'resize', debounce(setZoomCenter, 200));

/**
 * 设置缩放中心
 */
function setZoomCenter() {
  const diagramBody = document.querySelector('.diagram-main-body');
  const width = diagramBody?.clientWidth || 0;
  const height = diagramBody?.clientHeight || 0;

  zoomCenter.value = [width / 2, height / 2];
}

/**
 * 缩放callback
 */
function onLfTransform(e: EventArgs['graph:transform']) {
  const { transform } = e;

  zoomSize.value = Number(Decimal.mul(transform.SCALE_X, 100).toFixed(0));
}

/**
 * 调整缩放
 */
function setLfZoom(type: 'add' | 'sub') {
  const transform = lf.getTransform();
  const to = type === 'add' ? 1 : -1;

  const toZoom = Decimal.add(
    transform.SCALE_X,
    Decimal.mul(to, ZOOM_STEP),
  ).toNumber();

  lf.zoom(toZoom);
}

/**
 * 重置
 */
function resetLfZoomAndPosition() {
  lf.resetTranslate();
  lf.resetZoom();
}

/**
 * 适配
 */
function fitLfView() {
  lf.fitView();
}

onMounted(() => {
  nextTick(() => {
    setZoomCenter();
  });
});
</script>

<template>
  <div class="tool-item">
    <ElPopover placement="bottom" popper-class="!w-auto" trigger="click">
      <template #reference>
        <div class="tool-item-content">
          <div class="tool-item-top-text">{{ zoomSize }}%</div>
          <div class="" style="line-height: 18px">视图</div>
        </div>
      </template>

      <div class="flex gap-2">
        <ElButton size="small" @click="() => setLfZoom('add')">
          <ElIcon :size="14"> <Plus /> </ElIcon>
        </ElButton>
        <ElButton class="!ml-0" size="small" @click="() => setLfZoom('sub')">
          <ElIcon :size="14"> <Minus /> </ElIcon>
        </ElButton>
        <ElButton
          class="!ml-0"
          size="small"
          @click="() => resetLfZoomAndPosition()"
        >
          重置为初始位置
        </ElButton>
        <ElButton class="!ml-0" size="small" @click="() => fitLfView()">
          缩放至全部显示
        </ElButton>
      </div>
    </ElPopover>
  </div>
</template>

<style lang="scss" scoped></style>
