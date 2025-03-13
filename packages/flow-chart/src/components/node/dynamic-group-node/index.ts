import type LogicFlow from '@logicflow/core';

import rectDynamicGroupNode from './rect-node';

export function registerDynamicGroupNodes(lf: LogicFlow) {
  const nodes = [rectDynamicGroupNode];

  nodes.forEach((node) => {
    lf.register(node.node);
  });
}

export { rectDynamicGroupNode };
