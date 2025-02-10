import type { RegisterCusNodeGroupOptions } from '../types/register-node';

import { mitt } from '@clsy/utils';

type MittEvent = {
  register: RegisterCusNodeGroupOptions | RegisterCusNodeGroupOptions[];
};

export const mittEmitter = mitt<MittEvent>();
