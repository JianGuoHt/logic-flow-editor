<script setup lang="ts">
import type { RegisterCusNodeGroupOptions } from '../types/register-node';

import LogicFlow from '@logicflow/core';
import { SelectionSelect } from '@logicflow/extension';

import { getProjectSetting } from '../config/project-setting';
import DiagramGraphicElementSidebar from '../diagram-graphic-element-sidebar/diagram-graphic-element-sidebar.vue';
import DiagramPropertyPanel from '../diagram-property-panel/diagram-property-panel.vue';
import DiagramToolbar from '../diagram-toolbar/diagram-toolbar.vue';
import { registerCustomEdge } from '../edge';
import { getActiveEdgeType } from '../edge/help';
import { mittEmitter } from '../events/mitt';
import { registerCustomElement } from '../node';
import { lfProvideKey } from '../types/lf-token';

import '@logicflow/core/dist/index.css';
import '@logicflow/extension/es/index.css';

const projectSetting = getProjectSetting();

const diagramRef = useTemplateRef<HTMLDivElement>('diagramRef');

const lf = shallowRef<LogicFlow>();

const registerCustomNodes = ref<RegisterCusNodeGroupOptions[]>([]);

function initLogicFlow() {
  lf.value = new LogicFlow({
    allowResize: true,
    allowRotate: true,
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
    plugins: [SelectionSelect],
  });

  const _lf = unref(lf as unknown as LogicFlow);

  _lf.setTheme({
    baseEdge: { strokeWidth: 1 },
    baseNode: { strokeWidth: 1 },
    resizeOutline: {
      fill: 'transparent',
      stroke: '#1890ff',
      strokeDasharray: '3,3',
      strokeWidth: 1,
    },
    snapline: {
      stroke: '#1890ff', // 对齐线颜色
      strokeWidth: 1, // 对齐线宽度
    },
  });

  // 设置默认边
  _lf.setDefaultEdgeType(getActiveEdgeType());

  registerCustomElement(_lf);
  registerCustomEdge(_lf);

  _lf.on('history:change1', () => {});

  _lf.render({});
}

function initOnMittRegister() {
  mittEmitter.on('register', (v) => {
    let data: RegisterCusNodeGroupOptions[] = [];

    if (Array.isArray(v)) {
      data.push(...v);
    } else {
      data.push(v);
    }

    data = data.map((v) => ({
      ...v,
      nodes: v.nodes.map((n) => ({ ...n, icon: shallowRef(n.icon) })),
    }));

    registerCustomNodes.value.push(...data);
  });
}

function onDragInNode(type: string) {
  const _lf = unref(lf);

  _lf!.dnd.startDrag({
    type,
  });
}

onMounted(() => {
  nextTick(() => {
    initOnMittRegister();
    initLogicFlow();
  });
});

provide(lfProvideKey, {
  lf,
  registerCusNodes: registerCustomNodes,
});
</script>

<template>
  <div class="diagram-main-body h-screen w-screen">
    <DiagramToolbar v-if="!!lf" />
    <DiagramPropertyPanel v-if="!!lf" />

    <div
      :style="{
        height: `calc(100% - ${projectSetting.toolbar.height}px)`,
        top: `${projectSetting.toolbar.height}px`,
      }"
      class="fixed left-0 flex w-full flex-1 overflow-hidden"
    >
      <div class="h-full" style="width: 240px">
        <DiagramGraphicElementSidebar @drag-in-node="onDragInNode" />
      </div>

      <div class="h-full flex-1 overflow-hidden">
        <div ref="diagramRef" class="diagram-main-body h-full w-full"></div>
      </div>
    </div>
  </div>
</template>
