import type LogicFlow from '@logicflow/core';

import type { InjectionKey, ShallowRef } from 'vue';

export const lfProvideKey = Symbol('lfProvide') as InjectionKey<
  ShallowRef<LogicFlow | undefined>
>;
