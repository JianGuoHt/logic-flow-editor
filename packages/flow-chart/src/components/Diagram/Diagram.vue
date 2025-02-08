<script setup lang="ts">
import LogicFlow from '@logicflow/core';

import { registerCustomElement } from '../node';

import '@logicflow/core/lib/style/index.css';

const diagramRef = useTemplateRef<HTMLDivElement>('diagramRef');

let lf: LogicFlow;

function initLogicFlow() {
  lf = new LogicFlow({
    background: {
      backgroundColor: '#f4f4f4',
      backgroundImage:
        'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")',
      backgroundRepeat: 'repeat',
    },
    container: diagramRef.value!,
    grid: {
      size: 5,
      visible: false,
    },
    overlapMode: 1,
  });

  lf.setTheme({
    baseEdge: { strokeWidth: 1 },
    baseNode: { strokeWidth: 1 },
    snapline: {
      stroke: '#1890ff', // 对齐线颜色
      strokeWidth: 1, // 对齐线宽度
    },
  });

  registerCustomElement(lf);

  lf.on('history:change', () => {});

  lf.render({});
}

function onDragInNode(type: string) {
  lf.dnd.startDrag({
    type,
  });
}

onMounted(() => {
  nextTick(() => {
    initLogicFlow();
  });
});
</script>

<template>
  <div class="diagram-main-body h-screen w-screen">
    <div class="flex h-full">
      <div class="h-full" style="width: 240px">
        <diagram-graphic-element-sidebar @drag-in-node="onDragInNode" />
      </div>

      <div class="h-full flex-1 overflow-hidden">
        <div ref="diagramRef" class="diagram-main-body h-full w-full"></div>
      </div>
    </div>
  </div>
</template>
