import type LogicFlow from '@logicflow/core';

import { lfProvideKey } from '../types/lf-token';

/**
 * 获取logicFlow 实例
 */
export function useLf() {
  const _lf = inject(lfProvideKey);
  const lf = unref(_lf);

  return lf as LogicFlow;
}
