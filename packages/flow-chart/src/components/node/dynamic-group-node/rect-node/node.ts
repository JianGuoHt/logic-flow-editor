import type { DynamicGroupNodeModel } from '@logicflow/extension';

import { h } from '@logicflow/core';

import { CusDynamicGroup } from '../../basic';

class RectNodeModel extends CusDynamicGroup.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
  }

  override setAttributes() {
    this.menu = [
      {
        callback: (groupNode: any) => {
          const groupModel = this.graphModel.getNodeModelById(
            groupNode.id,
          ) as DynamicGroupNodeModel;

          if (!groupModel) {
            return;
          }

          groupNode.children.forEach((id: any) => {
            // eslint-disable-next-line unicorn/prefer-dom-node-remove
            groupModel.removeChild(id);
          });
          this.graphModel.clearSelectElements();
          this.graphModel.deleteNode(groupNode.id);
        },
        text: '解除组合',
      },
    ];
  }
}

class RectNodeView extends CusDynamicGroup.view {
  override getShape() {
    const { model } = this.props;
    const { height, radius, width, x, y } = model;
    const style = model.getNodeStyle();
    const leftTopX = x - width / 2;
    const leftTopY = y - height / 2;

    const attrs = {
      height,
      rx: radius,
      ry: radius,
      width,
      x: leftTopX,
      y: leftTopY,
      ...style,
    };

    const doms = [h('rect', { ...attrs })];

    return h('g', {}, doms);
  }
}

export default {
  model: RectNodeModel,
  type: 'svg-rect--dynamic-group-node',
  view: RectNodeView,
};
