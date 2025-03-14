import type { CustomNodeProperty } from '#/components/types/custom-properties';
import type { DeepObjectKeys } from '#/components/types/help';

import type { InjectionKey } from 'vue';

type InjectionKeyType = {
  form: Ref<CustomNodeProperty>;
  setNodeProperties: (
    key: DeepObjectKeys<CustomNodeProperty>,
    value: any,
  ) => void;
};

export const diagramPropertyStylePanelProvideKey = Symbol(
  'style-panel-provide',
) as InjectionKey<InjectionKeyType>;
