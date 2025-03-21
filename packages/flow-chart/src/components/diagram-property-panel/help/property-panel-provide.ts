import type LogicFlow from '@logicflow/core';

import type { InjectionKey } from 'vue';

type InjectionKeyType = {
  activeNodes: Ref<LogicFlow.NodeData[]>;
  // form: Ref<CustomNodeProperty>;
  refreshActiveNodes: () => void;
  // setNodeProperties: (
  //   key: DeepObjectKeys<CustomNodeProperty>,
  //   value: any,
  // ) => void;
};

export const diagramPropertyPanelProvideKey = Symbol(
  'diagram-property-panel-provide',
) as InjectionKey<InjectionKeyType>;
