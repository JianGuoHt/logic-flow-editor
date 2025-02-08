import { BaseNode, BaseNodeModel } from '@logicflow/core';

class BaseNewModel extends BaseNodeModel {}

class BaseNewNode extends BaseNode {}

export default {
  model: BaseNewModel,
  type: 'pro-base-node',
  view: BaseNewNode,
};
