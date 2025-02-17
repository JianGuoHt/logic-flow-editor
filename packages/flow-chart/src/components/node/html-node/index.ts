import type LogicFlow from '@logicflow/core';

import { mittEmitter } from '#/components/events/mitt';

import testHtmlVue from './test-html-vue';

export function registerHtmlNodes(lf: LogicFlow) {
  const nodes = [testHtmlVue];

  nodes.forEach((node) => {
    lf.register(node.node);
  });

  mittEmitter.emit('register', {
    name: 'html节点',
    nodes,
    type: 'html-node',
  });
}
