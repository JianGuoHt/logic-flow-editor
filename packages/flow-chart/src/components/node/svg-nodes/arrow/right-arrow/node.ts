/**
 * 右箭头
 */
import { h } from '@logicflow/core';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class RightArrowNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 50;
  }
}

class RightArrowNodeView extends CusRect.view {
  override getShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowHeight = (1 / 3) * height;
    const leftX = x - (1 / 2) * width;
    const rightX = x + (1 / 2) * width;
    const rightX2 = x + (1 / 5) * width;
    const attrs = {
      ...style,
      height,
      points: [
        [rightX2, y - (1 / 2) * ArrowHeight],
        [rightX2, y - (1 / 2) * height],
        [rightX, y],
        [rightX2, y + (1 / 2) * height],
        [rightX2, y + (1 / 2) * ArrowHeight],
        [leftX, y + (1 / 2) * ArrowHeight],
        [leftX, y - (1 / 2) * ArrowHeight],
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
  model: RightArrowNodeModel,
  type: 'svg-right-arrow',
  view: RightArrowNodeView,
};
