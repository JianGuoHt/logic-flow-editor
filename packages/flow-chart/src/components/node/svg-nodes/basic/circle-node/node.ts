/**
 * 圆
 */

import { h } from '@logicflow/core';

import { CusEllipse } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class CircleNodeModel extends CusEllipse.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
  }
}

class CircleNodeView extends CusEllipse.view {
  override getShape() {
    const { model } = this.props;
    const { rx, ry, x, y } = model;
    const style = model.getNodeStyle();

    const attrs = {
      cx: x,
      cy: y,
      rx,
      ry,
      x,
      y,
      ...style,
    };

    const doms = [h('ellipse', { ...attrs })];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: CircleNodeModel,
  type: 'svg-circle',
  view: CircleNodeView,
};
