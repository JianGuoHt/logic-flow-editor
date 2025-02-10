/**
 * 竖直双向箭头
 */
import { h } from '@logicflow/core';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class VerticalArrowNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 40;
    this.height = 80;
  }
}

class VerticalArrowNodeView extends CusRect.view {
  override getShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const ArrowWidth = (1 / 3) * width;
    const upY = y - (1 / 2) * height;
    const upY2 = y - (1 / 5) * height;
    const downY = y + (1 / 2) * height;
    const downY2 = y + (1 / 5) * height;
    const attrs = {
      ...style,
      height,
      points: [
        // 上箭头
        [x - (1 / 2) * ArrowWidth, upY2],
        [x - (1 / 2) * width, upY2],
        [x, upY],
        [x + (1 / 2) * width, upY2],
        [x + (1 / 2) * ArrowWidth, upY2],
        // 下箭头
        [x + (1 / 2) * ArrowWidth, downY2],
        [x + (1 / 2) * width, downY2],
        [x, downY],
        [x - (1 / 2) * width, downY2],
        [x - (1 / 2) * ArrowWidth, downY2],
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
  model: VerticalArrowNodeModel,
  type: 'pro-vertical-arrow',
  view: VerticalArrowNodeView,
};
