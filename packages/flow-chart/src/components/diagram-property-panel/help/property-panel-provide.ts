import type LogicFlow from '@logicflow/core';

import type { CustomNodeAllStyleProperty } from '#/components/types/custom-properties';

import type { InjectionKey } from 'vue';

type InjectionKeyType = {
  activeNodes: Ref<LogicFlow.NodeData[]>;
  form: Ref<CustomNodeAllStyleProperty>;
  refreshActiveNodes: () => void;
  setNodeProperties: <K extends keyof CustomNodeAllStyleProperty>(
    key: K,
    value: CustomNodeAllStyleProperty[K],
  ) => void;
};

export const diagramPropertyPanelProvideKey = Symbol(
  'diagram-property-panel-provide',
) as InjectionKey<InjectionKeyType>;
