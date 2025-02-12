import type { LogicFlow, ModelType } from '@logicflow/core';

/**
 * 获取激活节点的类型
 */
export function getActiveNodeModelType(lf: LogicFlow): ModelType | null {
  const { nodes } = lf.getSelectElements();
  if (nodes.length === 1) {
    const node = nodes[0];

    if (!node) {
      return null;
    }

    const nodeModel = lf.getModelById(node.id);

    return nodeModel?.modelType || null;
  }

  return null;
}
