import type LogicFlow from '@logicflow/core';

import bezier from './bezier';
import curved from './curved';
import line from './line';
import polyline from './polyline';

/**
 * 注册自定义边
 */
export const registerCustomEdge = (lf: LogicFlow) => {
  lf.register(bezier);
  lf.register(line);
  lf.register(polyline);
  lf.register(curved);
};
