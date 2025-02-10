import type LogicFlow from '@logicflow/core';

import { mittEmitter } from '#/components/events/mitt';

import circleNode from './circle-node';
import diamondNode from './diamond-node';
import ellipseNode from './ellipse-node';
import rectNode from './rect-node';
import rectRadiusView from './rect-radius-node';

export function registerBasicNodes(lf: LogicFlow) {
  const nodes = [
    circleNode,
    diamondNode,
    ellipseNode,
    rectNode,
    rectRadiusView,
  ];

  nodes.forEach((node) => {
    lf.register(node.node);
  });

  mittEmitter.emit('register', {
    name: '基础图形',
    nodes,
    type: 'basic',
  });
}
