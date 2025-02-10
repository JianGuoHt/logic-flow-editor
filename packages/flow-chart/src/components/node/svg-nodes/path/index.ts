import type LogicFlow from '@logicflow/core';

import { mittEmitter } from '#/components/events/mitt';

import actorNode from './actor-node';
import cylinderNode from './cylinder-node';
import parallelogramNode from './parallelogram-node';
import triangleNode from './triangle-node';

export function registerPathNodes(lf: LogicFlow) {
  const nodes = [actorNode, cylinderNode, parallelogramNode, triangleNode];

  nodes.forEach((node) => {
    lf.register(node.node);
  });

  mittEmitter.emit('register', {
    name: '路径图形',
    nodes,
    type: 'path',
  });
}
