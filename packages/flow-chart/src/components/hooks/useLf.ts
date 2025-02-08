import type LogicFlow from '@logicflow/core';

import { lfProvideKey } from '../types/lf-token';

/**
 * 获取logicFlow 实例
 */
export function useLf() {
  const _lf = inject(lfProvideKey);
  const lf = unref(_lf);

  if (!lf) {
    throw new Error('logicFlow实例不存在,请确保在logicFlow初始化后使用');
  }

  return lf as LogicFlow;
}
