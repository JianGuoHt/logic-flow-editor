/**
 * 菱形
 */

import { h } from '@logicflow/core';

import { CusDiamond } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class DiamondNodeModel extends CusDiamond.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
  }
}

class DiamondNodeView extends CusDiamond.view {
  override getShape() {
    const { model } = this.props;
    const { points, x, y } = model;
    const style = model.getNodeStyle();

    const attrs = {
      points,
      x,
      y,
      ...style,
    };
    const doms = [h('polygon', { ...attrs })];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: DiamondNodeModel,
  type: 'pro-diamond',
  view: DiamondNodeView,
};
