<script setup lang="ts">
import type { LogicFlow as LF } from '@logicflow/core';

import type { RegisterCusNodeGroupOptions } from '../types/register-node';

import { BaseNodeModel, LogicFlow } from '@logicflow/core';
import {
  type ILabelOptions,
  Label,
  Menu,
  MiniMap,
  SelectionSelect,
} from '@logicflow/extension';
import { getTeleport } from '@logicflow/vue-node-registry';

import testJson from '#/components/assets/json/test.json';

import { getProjectSetting } from '../config/project-setting';
import DiagramGraphicElementSidebar from '../diagram-graphic-element-sidebar/diagram-graphic-element-sidebar.vue';
import DiagramPropertyPanel from '../diagram-property-panel/diagram-property-panel.vue';
import {
  DiagramRichEditorDialog,
  type DiagramRichEditorDialogInstance,
} from '../diagram-rich-editor-dialog';
import DiagramToolbar from '../diagram-toolbar/diagram-toolbar.vue';
import { registerCustomEdge } from '../edge';
import { getActiveEdgeType } from '../edge/help';
import { mittEmitter } from '../events/mitt';
import { registerCustomElement } from '../node';
import { registerHtmlNodes } from '../node/html-node';
import { registerVueNodes } from '../node/vue-node';
import { lfProvideKey } from '../types/lf-token';

import '@logicflow/core/dist/index.css';
import '@logicflow/extension/es/index.css';

const projectSetting = getProjectSetting();

const diagramRef = useTemplateRef<HTMLDivElement>('diagramRef');
const richEditorDialogRef = useTemplateRef<DiagramRichEditorDialogInstance>(
  'richEditorDialogRef',
);

const lf = shallowRef<LogicFlow>();
const TeleportContainer = getTeleport();
const flowId = ref('');

const registerCustomNodes = ref<RegisterCusNodeGroupOptions[]>([]);

function initLogicFlow() {
  const options = {
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
    plugins: [SelectionSelect, Menu, MiniMap],
    pluginsOptions: {
      label: {} as ILabelOptions,
      miniMap: {
        bottomPosition: 0,
        height: 200,
        leftPosition: 0,
        width: 200,
      },
      // proximityConnect: {
      //   distance: 20,
      //   enable: true,
      // } as ProximityConnectProps,
    },
    textEdit: false,
  } as LF.Options;

  if (projectSetting.plugins.label) {
    options.plugins?.push(Label);
  }

  lf.value = new LogicFlow(options);

  const _lf = unref(lf as unknown as LogicFlow);

  _lf.on('graph:rendered', ({ graphModel }) => {
    flowId.value = graphModel.flowId!;
  });

  if (projectSetting.plugins.label) {
    // TODO: 代优化，等官方后续新增禁用编辑的api选项
    /** 禁用label编辑 */
    _lf.on('label:click', (e) => {
      const model = e.model as BaseNodeModel;

      const _label = model.properties._label as
        | LogicFlow.LabelConfig[]
        | undefined;

      if (!_label) {
        return;
      }

      const formatLabel = _label.map((v) => ({
        ...v,
        editable: false,
      }));

      model.setProperties({
        _label: formatLabel,
      });
    });
  }

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
  registerVueNodes(_lf);
  registerHtmlNodes(_lf);
  setLfMenu(_lf);

  _lf.render({});

  setTimeout(() => {
    _lf.renderRawData(testJson);
  }, 2000);
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

/**
 * 设置右键菜单
 */
function setLfMenu(lf: LogicFlow) {
  const menu = lf.extension.menu as Menu;

  menu.setMenuConfig({
    // 边右键菜单(
    edgeMenu: [
      {
        callback: (edge) => {
          lf.deleteEdge(edge.id);
        },
        text: '删除',
      },
    ],
    // 画布右键菜单
    graphMenu: [],
    // 节点右键菜单
    nodeMenu: [
      {
        callback: (node) => {
          lf.deleteNode(node.id);
        },
        text: '删除',
      },
    ],
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
  richEditDialog: richEditorDialogRef,
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
        <TeleportContainer :flow-id="flowId" />
      </div>
    </div>

    <DiagramRichEditorDialog v-if="!!lf" ref="richEditorDialogRef" />
  </div>
</template>

<style lang="scss">
@use '../design/index.scss';
</style>
