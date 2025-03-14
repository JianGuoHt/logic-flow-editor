/**
 * 下箭头
 */

import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

import { h } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import { CusRect } from '../../../basic';

class DownArrowNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 50;
    this.height = 80;

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '下箭头' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class DownArrowNodeView extends CusRect.view {
  override getShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowWidth = (1 / 3) * width;
    const upY = y - (1 / 2) * height;
    const downY = y + (1 / 2) * height;
    const downY2 = y + (1 / 5) * height;
    const attrs = {
      ...style,
      height,
      points: [
        [x - (1 / 2) * ArrowWidth, downY2],
        [x - (1 / 2) * width, downY2],
        [x, downY],
        [x + (1 / 2) * width, downY2],
        [x + (1 / 2) * ArrowWidth, downY2],
        [x + (1 / 2) * ArrowWidth, upY],
        [x - (1 / 2) * ArrowWidth, upY],
      ],
      width,
      x,
      y,
    };
    const doms = [h('polygon', { ...attrs })];

    return h('g', {}, doms);
  }
}

export default {
  model: DownArrowNodeModel,
  type: 'svg-down-arrow',
  view: DownArrowNodeView,
};
