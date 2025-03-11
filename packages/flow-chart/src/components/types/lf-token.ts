import type LogicFlow from '@logicflow/core';

import type { DiagramRichEditorDialogInstance } from '../diagram-rich-editor-dialog';
import type { RegisterCusNodeGroupOptions } from './register-node';

import type { InjectionKey, ShallowRef } from 'vue';

export const lfProvideKey = Symbol('lfProvide') as InjectionKey<{
  lf: ShallowRef<LogicFlow | undefined>;
  registerCusNodes: Ref<RegisterCusNodeGroupOptions[]>;
  richEditDialog: ShallowRef<
    DiagramRichEditorDialogInstance | null | undefined
  >;
}>;
