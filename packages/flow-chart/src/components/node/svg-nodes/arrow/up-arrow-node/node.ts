import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

/**
 * 上箭头
 */
import { h } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class UpArrowNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 50;
    this.height = 80;

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '上箭头' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class UpArrowNodeView extends CusRect.view {
  override getShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowWidth = (1 / 3) * width;
    const upY = y - (1 / 2) * height;
    const upY2 = y - (1 / 5) * height;
    const downY = y + (1 / 2) * height;
    const attrs = {
      ...style,
      height,
      points: [
        [x - (1 / 2) * ArrowWidth, upY2],
        [x - (1 / 2) * width, upY2],
        [x, upY],
        [x + (1 / 2) * width, upY2],
        [x + (1 / 2) * ArrowWidth, upY2],
        [x + (1 / 2) * ArrowWidth, downY],
        [x - (1 / 2) * ArrowWidth, downY],
      ],
      width,
      x,
      y,
    };
    const doms = [h('polygon', { ...attrs })];
    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: UpArrowNodeModel,
  type: 'svg-up-arrow',
  view: UpArrowNodeView,
};
