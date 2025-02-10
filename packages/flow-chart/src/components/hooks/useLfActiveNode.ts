import type LogicFlow from '@logicflow/core';

import { useLf } from './useLf';
import { useLfEvent } from './useLfEvent';

/**
 * 获取当前选中的节点
 */
export function useLfActiveNodes(fn?: (nodes: LogicFlow.NodeData[]) => void) {
  const lf = useLf();

  const activeNodes = ref<LogicFlow.NodeData[]>([]);

  useLfEvent('node:click', () => {
    const { nodes } = lf.getSelectElements();

    activeNodes.value = nodes;
    fn && fn(nodes);
  });

  useLfEvent('selection:selected', () => {
    const { nodes } = lf.getSelectElements();

    activeNodes.value = nodes;
    fn && fn(nodes);
  });

  return activeNodes;
}
