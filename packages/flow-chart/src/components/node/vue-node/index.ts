import type LogicFlow from '@logicflow/core';

import { register } from '@logicflow/vue-node-registry';

import { mittEmitter } from '#/components/events/mitt';

import richText from './rich-text';

export function registerVueNodes(lf: LogicFlow) {
  const vueNodes = [richText];

  vueNodes.forEach((node) => {
    register({ component: node.node, type: node.type }, lf);
  });

  mittEmitter.emit('register', {
    name: '更多节点',
    nodes: vueNodes,
    type: 'vue-nodes',
  });
}
