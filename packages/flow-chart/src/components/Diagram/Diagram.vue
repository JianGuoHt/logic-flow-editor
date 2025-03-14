<script setup lang="ts">
import type { LogicFlow as LF } from '@logicflow/core';

import type { RegisterCusNodeGroupOptions } from '../types/register-node';

import {
  BaseNodeModel,
  getEdgeOutline,
  getNodeOutline,
  LogicFlow,
  OverlapMode,
} from '@logicflow/core';
import {
  DynamicGroup,
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
import { rectDynamicGroupNode } from '../node/dynamic-group-node';
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

/** space 键是否按下 */
const spaceKeyDown = ref(false);

const registerCustomNodes = ref<RegisterCusNodeGroupOptions[]>([]);

/** 初始化 LogicFlow */
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
    history: true,
    keyboard: {
      enabled: true,
      shortcuts: [
        {
          callback: () => {
            if (spaceKeyDown.value) {
              return;
            }

            const lfDom = document.querySelector(
              '.lf-canvas-overlay',
            ) as SVGAElement;

            lfDom.addEventListener('mousedown', onSpaceAndMousedown);
            lfDom.addEventListener('mouseup', onSpaceAndMouseup);

            spaceKeyDown.value = true;

            lf.value?.closeSelectionSelect();

            lfDom.style.cursor = 'grab';
          },
          keys: ['space'],
        },
        {
          action: 'keyup',
          callback: () => {
            const lfDom = document.querySelector(
              '.lf-canvas-overlay',
            ) as SVGAElement;

            lfDom.removeEventListener('mousedown', onSpaceAndMousedown);
            lfDom.removeEventListener('mouseup', onSpaceAndMouseup);

            if (localStorage.getItem('LF_SELECTION_SELECT') === 'true') {
              lf.value?.openSelectionSelect();
            }

            spaceKeyDown.value = false;
            lfDom.style.cursor = 'default';
          },
          keys: ['space'],
        },
      ],
    },
    overlapMode: OverlapMode.INCREASE,
    plugins: [SelectionSelect, Menu, MiniMap, DynamicGroup],
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

  // eslint-disable-next-line no-constant-condition
  if (true) {
    setTimeout(() => {
      _lf.renderRawData(testJson);
    }, 2000);
  }

  // 修改鼠标样式
  const lfDom = document.querySelector('.lf-canvas-overlay') as SVGAElement;
  lfDom.addEventListener('mousedown', () => {
    if (spaceKeyDown.value) {
      return;
    }

    lfDom.style.cursor = 'grabbing';
  });

  lfDom.addEventListener('mouseup', () => {
    lfDom.style.cursor = 'default';
  });
}

/** 空格和鼠标按下 */
function onSpaceAndMousedown() {
  const lfDom = document.querySelector('.lf-canvas-overlay') as SVGAElement;
  lfDom.style.cursor = 'grabbing';
}

/** 空格和鼠标抬起 */
function onSpaceAndMouseup() {
  const lfDom = document.querySelector('.lf-canvas-overlay') as SVGAElement;
  lfDom.style.cursor = 'grab';
}

/** 注册自定义节点 */
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
        className: 'text-danger',
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
        className: 'text-danger',
        text: '删除',
      },
    ],
  });

  menu.setMenuByType({
    menu: [
      {
        callback: (elements) => {
          const { selectElements } = lf.graphModel;
          if (selectElements.size <= 1) return;

          let x = Number.MAX_SAFE_INTEGER;
          let y = Number.MAX_SAFE_INTEGER;
          let x1 = Number.MIN_SAFE_INTEGER;
          let y1 = Number.MIN_SAFE_INTEGER;

          selectElements.forEach((element) => {
            let outline = {
              x: 0,
              x1: 0,
              y: 0,
              y1: 0,
            };

            if (element.BaseType === 'node') outline = getNodeOutline(element)!;
            if (element.BaseType === 'edge') outline = getEdgeOutline(element)!;

            x = Math.min(x, outline.x);
            y = Math.min(y, outline.y);
            x1 = Math.max(x1, outline.x1);
            y1 = Math.max(y1, outline.y1);
          });

          const offset = 20;
          const width = x1 - x + offset * 2;
          const height = y1 - y + offset * 2;

          const group = lf.addNode({
            // 默认样式
            properties: {
              backgroundColor: '#fff',
              borderStyle: 'dashed',
              height,
              width,
            },
            type: rectDynamicGroupNode.type,
            x: x - offset + width / 2,
            y: y - offset + height / 2,
          });

          // 仅需要将 node 添加至 group
          elements.nodes.forEach((node: any) => {
            group.addChild(node.id);
          });
          // 取消选中
          lf.clearSelectElements();
        },
        text: '组合',
      },
      {
        callback: (elements) => {
          elements.nodes.forEach((node: any) => {
            lf.deleteNode(node.id);
          });
          elements.edges.forEach((edge: any) => {
            lf.deleteEdge(edge.id);
          });
        },
        className: 'text-danger menu-item-divider',
        text: '删除',
      },
    ],
    type: 'lf:defaultSelectionMenu',
  });
}

/** 拖拽图形进入画板 */
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
        width: `calc(100% - ${projectSetting.propertyPanel.width}px)`,
      }"
      class="fixed left-0 flex flex-1 overflow-hidden"
    >
      <div class="h-full" style="width: 240px">
        <DiagramGraphicElementSidebar @drag-in-node="onDragInNode" />
      </div>

      <div class="h-full flex-1 overflow-hidden">
        <div ref="diagramRef" class="diagram-main-body h-full w-full"></div>
        <TeleportContainer :flow-id="flowId" />
      </div>
    </div>

    <DiagramRichEditorDialog ref="richEditorDialogRef" />
  </div>
</template>

<style lang="scss">
@use '../design/index.scss';
</style>
