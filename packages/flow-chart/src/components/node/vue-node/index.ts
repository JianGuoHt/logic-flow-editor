import type LogicFlow from '@logicflow/core';

import { register } from '@logicflow/vue-node-registry';

import { mittEmitter } from '#/components/events/mitt';

import progressNode from './progress-node';
import richText from './rich-text';

export function registerVueNodes(lf: LogicFlow) {
  const vueNodes = [progressNode, richText];

  vueNodes.forEach((node) => {
    register({ component: node.node, type: node.type }, lf);
  });

  mittEmitter.emit('register', {
    name: 'vue节点',
    nodes: vueNodes,
    type: 'vue-nodes',
  });
}
