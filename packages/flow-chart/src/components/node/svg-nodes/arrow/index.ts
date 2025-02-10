import type LogicFlow from '@logicflow/core';

import { mittEmitter } from '#/components/events/mitt';

import downArrowNode from './down-arrow-node';
import horizontalArrowNode from './horizontal-arrow-node';
import leftArrowNode from './left-arrow';
import rightArrowNode from './right-arrow';
import upArrowNode from './up-arrow-node';
import verticalArrowNode from './vertical-arrow-node';

export function registerArrowNodes(lf: LogicFlow) {
  const nodes = [
    downArrowNode,
    horizontalArrowNode,
    leftArrowNode,
    rightArrowNode,
    upArrowNode,
    verticalArrowNode,
  ];

  nodes.forEach((node) => {
    lf.register(node.node);
  });

  mittEmitter.emit('register', {
    name: '箭头',
    nodes,
    type: 'arrow',
  });
}
