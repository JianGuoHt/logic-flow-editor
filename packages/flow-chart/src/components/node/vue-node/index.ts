import type LogicFlow from '@logicflow/core';

import { register } from '@logicflow/vue-node-registry';

import { mittEmitter } from '#/components/events/mitt';

import progressNode from './progress-node';

export function registerVueNodes(lf: LogicFlow) {
  const vueNodes = [progressNode];

  vueNodes.forEach((node) => {
    register({ component: node.node, type: node.type }, lf);
  });

  mittEmitter.emit('register', {
    name: 'vue节点',
    nodes: vueNodes,
    type: 'vue-nodes',
  });
}
