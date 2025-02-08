import type LogicFlow from '@logicflow/core';

import { useLf } from './useLf';
import { useLfEvent } from './useLfEvent';

/**
 * 获取当前选中的节点
 */
export function useLfActiveNodes() {
  const lf = useLf();

  const activeNodes = ref<LogicFlow.NodeData[]>([]);

  useLfEvent('node:click', () => {
    const { nodes } = lf.getSelectElements();

    nodes.forEach((node) => {
      node.zIndex;
    });
    activeNodes.value = nodes;
  });

  return activeNodes;
}
