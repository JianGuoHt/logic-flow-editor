import { h } from '@logicflow/core';

import RectNode from '../basic/rect-node';
import { getShapeImage } from '../utils/shape-image';

// 左箭头
class LeftArrowNodeModel extends RectNode.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 50;
  }
}
class LeftArrowNodeView extends RectNode.view {
  override getResizeShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowHeight = (1 / 3) * height;
    const leftX = x - (1 / 2) * width;
    const leftX2 = x - (1 / 5) * width;
    const rightX = x + (1 / 2) * width;
    const attrs = {
      ...style,
      height,
      points: [
        [leftX2, y - (1 / 2) * ArrowHeight],
        [leftX2, y - (1 / 2) * height],
        [leftX, y],
        [leftX2, y + (1 / 2) * height],
        [leftX2, y + (1 / 2) * ArrowHeight],
        [rightX, y + (1 / 2) * ArrowHeight],
        [rightX, y - (1 / 2) * ArrowHeight],
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
  model: LeftArrowNodeModel,
  type: 'pro-left-arrow',
  view: LeftArrowNodeView,
};
