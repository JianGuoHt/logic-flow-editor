/**
 * 三角形
 */
import { h } from '@logicflow/core';

import { CusRect } from '../../basic';
import { getShapeImage } from '../../utils/shape-image';

class TriangleNodeModel extends CusRect.model {
  override initNodeData(data: any): void {
    super.initNodeData(data);
  }
}

class TriangleNodeView extends CusRect.view {
  override getShape() {
    const { model } = this.props;
    const { height, width, x, y } = model;
    const style = model.getNodeStyle();
    const attrs = {
      ...style,
      height,
      points: [
        [x - width / 2, y + height / 2],
        [x - width / 2, y - height / 2],
        [x + width / 2, y],
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
  model: TriangleNodeModel,
  type: 'pro-triangle',
  view: TriangleNodeView,
};
