import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

import { h } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { CusRect } from '../../../basic';

class RectNodeModel extends CusRect.model {
  override initNodeData(data: any): void {
    super.initNodeData(data);
    this.setProperties(
      merge(
        {
          _cus_layer: { name: '正方形' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class RectNodeView extends CusRect.view {
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
  type: 'svg-rect',
  view: RectNodeView,
};
