import { h } from '@logicflow/core';

import RectNode from '../basic/rect-node';
import { getShapeImage } from '../utils/shape-image';

// 上箭头
class UpArrowNodeModel extends RectNode.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 50;
    this.height = 80;
  }
}

class UpArrowNodeView extends RectNode.view {
  override getResizeShape() {
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
  type: 'pro-up-arrow',
  view: UpArrowNodeView,
};
