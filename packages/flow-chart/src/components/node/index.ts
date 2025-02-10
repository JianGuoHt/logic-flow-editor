import type LogicFlow from '@logicflow/core';

import { registerArrowNodes } from './svg-nodes/arrow';
import { registerBasicNodes } from './svg-nodes/basic';
import { registerPathNodes } from './svg-nodes/path';

/**
 * 注册自定义节点
 */
export const registerCustomElement = (lf: LogicFlow) => {
  registerArrowNodes(lf);
  registerBasicNodes(lf);
  registerPathNodes(lf);
};
